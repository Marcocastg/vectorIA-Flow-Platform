import { Controller, Post, Body, Query, UseGuards, Get, Req, Logger, UnauthorizedException } from '@nestjs/common';
import { createReportDto } from 'src/application/dto/report';
import { CreateReportUseCase } from 'src/application/uses-cases/report';
import { PredictionsService } from 'src/core/services/predictions/predictions.service';

@Controller('predictions')
export class PredictionsController {
  constructor(private readonly predictionsService: PredictionsService, private readonly createReportUseCase: CreateReportUseCase) {}

  private readonly logger = new Logger(PredictionsController.name);

  @Post()
  async predict(
    @Query('platform') platform: string,
    @Body() data: any
  ) {
    // data: Son los campos avgViewers_d1, followers_d1, etc.
    return this.predictionsService.getPrediction(platform, data);
  }

  @Post('analyze')
  async analyze(@Body() body: any, @Req() req: any) {
    this.logger.log('--- DEBUG REQUEST ---');
    this.logger.log(`SessionID: ${req.sessionID}`);
    this.logger.log(`User en Req: ${JSON.stringify(req.user)}`);
    this.logger.log(`Is Authenticated: ${req.isAuthenticated()}`);

    const user = req.user || req.session?.passport?.user;

    const userId = typeof user === 'string' ? user : user.uuid || user.id;

    if (!userId) {
         throw new UnauthorizedException('Error crítico: No se pudo extraer el UUID del usuario.');
    }

    if (!req.user || !req.user.uuid) {
        throw new UnauthorizedException('No se pudo identificar al usuario. La sesión puede haber expirado.');
    }

    let aiAnalysisText = "Análisis pendiente.";
    try {
        const analysisResult = await this.predictionsService.getAnalysis(
            body.platform, 
            body.metrics
        );
        aiAnalysisText = analysisResult.analysis;
    } catch (error) {
        this.logger.warn("Gemini falló, pero guardaremos el reporte igual.");
        aiAnalysisText = "El análisis de IA no pudo generarse en este momento, pero tus datos han sido guardados.";
    }

    let cleanInputData: any = {};
    const raw = body.rawInput || {};

    if (body.platform === 'twitch') {
        cleanInputData = {
            followers1: Number(raw.followers_d1 || 0),
            followers2: Number(raw.followers_d14 || 0),
            avgViewers1: Number(raw.avgViewers_d1 || 0),
            avgViewers2: Number(raw.avgViewers_d14 || 0),
            // Opcionales
            comments_most_viewed: Number(raw.comments_most_viewed || 0),
            comments_least_viewed: Number(raw.comments_least_viewed || 0),
        };
    } else { // Kick
        cleanInputData = {
            followers1: Number(raw.FOLLOWERS_D14 || 0),
            followers2: Number(raw.FOLLOWERS_D21 || 0),
            avgViewers1: Number(raw.AVG_VIEWERS_D1 || 0), // O D14 según tu lógica
            avgViewers2: Number(raw.AVG_VIEWERS_D14 || 0),
        };
    }

    
    const reportData: createReportDto = {
      channelName: body.channelName || 'Unknown Channel',
      platformName: body.platform,
      
      // Datos de entrada originales (D1, D14)
      inputData: cleanInputData, 
      
      // Resultados de la predicción numérica
      predictionData: {
        followers_predicted: body.metrics.currentFollowers + body.metrics.growthPrediction,
        viewers_predicted: body.metrics.viewersPrediction,
        growth_net: body.metrics.growthPrediction,
      } as any,
      
      // El texto que acabamos de generar con Gemini
      aiAnalysis: aiAnalysisText
    };

    this.logger.log(`Intentando guardar reporte para usuario: ${userId}`);
    try {
      const saveResult: any = await this.createReportUseCase.execute(reportData, userId);
      
      if (saveResult && saveResult.isSuccess === false) {
        this.logger.error(`❌ ERROR AL GUARDAR (UseCase): ${JSON.stringify(saveResult.error)}`);
      } else {
        this.logger.log(`✅ Reporte guardado correctamente en la BD.`);
      }
    } catch (dbError) {
      this.logger.error(`❌ EXCEPCIÓN AL GUARDAR: ${dbError.message}`, dbError.stack);
    }

    // Retornar el análisis al frontend
    return { analysis: aiAnalysisText };
  }

  // GET /api/predictions/wakeup
  @Get('wakeup')
  async wakeUp() {
    return this.predictionsService.wakeUpModels();
  }
}