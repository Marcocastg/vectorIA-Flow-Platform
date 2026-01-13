import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PredictionsService } from 'src/core/services/predictions/predictions.service';
import { PredictionsController } from '../predictions/predictions.controller';
import { ReportModule } from '../report/report.module';
import { CreateReportUseCase } from '../../../application/uses-cases/report/create-report.use-case';

@Module({
  imports: [HttpModule, ReportModule],
  controllers: [PredictionsController],
  providers: [PredictionsService, CreateReportUseCase],
})
export class PredictionsModule {}