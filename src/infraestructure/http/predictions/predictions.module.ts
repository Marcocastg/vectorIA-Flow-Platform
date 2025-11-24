import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PredictionsService } from 'src/core/services/predictions/predictions.service';
import { PredictionsController } from '../predictions/predictions.controller';

@Module({
  imports: [HttpModule], // ¡Importante para poder hacer peticiones!
  controllers: [PredictionsController],
  providers: [PredictionsService],
})
export class PredictionsModule {}