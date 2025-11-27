import { Controller, Post, Body, Query, UseGuards } from '@nestjs/common';
import { PredictionsService } from 'src/core/services/predictions/predictions.service';
import { AuthenticatedGuard } from 'src/infraestructure/guards/auth/authenticated.guard';

@Controller('predictions')
export class PredictionsController {
  constructor(private readonly predictionsService: PredictionsService) {}

  @Post()
  @UseGuards(AuthenticatedGuard)
  async predict(
    @Query('platform') platform: string,
    @Body() data: any
  ) {
    // data: Son los campos avgViewers_d1, followers_d1, etc.
    return this.predictionsService.getPrediction(platform, data);
  }

  @Post('analyze')
  async analyze(@Body() body: any) {
    // body debe tener: { platform: 'twitch', metrics: { ... } }
    return this.predictionsService.getAnalysis(body.platform, body.metrics);
  }
}