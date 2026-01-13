import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PredictionsService } from 'src/core/services/predictions/predictions.service';
import { PredictionsController } from '../predictions/predictions.controller';
import { ReportModule } from '../report/report.module';

@Module({
  imports: [HttpModule, ReportModule],
  controllers: [PredictionsController],
  providers: [PredictionsService],
})
export class PredictionsModule {}