import { Controller, Post, Body, Query, UseGuards } from '@nestjs/common';
import { PredictionsService } from 'src/core/services/predictions/predictions.service';
// import { AuthGuard } from '@nestjs/passport'; // Descomenta si quieres protegerlo

@Controller('predictions')
export class PredictionsController {
  constructor(private readonly predictionsService: PredictionsService) {}

  @Post()
  // @UseGuards(AuthGuard('jwt')) // Descomenta para exigir login
  async predict(
    @Query('platform') platform: string,
    @Body() data: any
  ) {
    // data: Son los campos avgViewers_d1, followers_d1, etc.
    return this.predictionsService.getPrediction(platform, data);
  }
}