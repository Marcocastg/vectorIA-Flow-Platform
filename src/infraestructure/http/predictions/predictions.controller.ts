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
    this.logger.log(`Usuario en request: ${JSON.stringify(req.user)}`);

    if (!req.user || !req.user.uuid) {
        throw new UnauthorizedException('No se pudo identificar al usuario. La sesión puede haber expirado.');
    }

    const analysisResult = await this.predictionsService.getAnalysis(
      body.platform, 
      body.metrics
    );
    
    const reportData: createReportDto = {
      channelName: body.channelName || 'Unknown Channel',
      platformName: body.platform,
      
      // Datos de entrada originales (D1, D14)
      inputData: body.rawInput, 
      
      // Resultados de la predicción numérica
      predictionData: {
        followers_predicted: body.metrics.currentFollowers + body.metrics.growthPrediction,
        viewers_predicted: body.metrics.viewersPrediction,
        growth_net: body.metrics.growthPrediction,
      } as any,
      
      // El texto que acabamos de generar con Gemini
      aiAnalysis: analysisResult.analysis
    };

    await this.createReportUseCase.execute(reportData, req.user.uuid);

    // Retornar el análisis al frontend
    return analysisResult;
  }

  // GET /api/predictions/wakeup
  @Get('wakeup')
  async wakeUp() {
    return this.predictionsService.wakeUpModels();
  }
}