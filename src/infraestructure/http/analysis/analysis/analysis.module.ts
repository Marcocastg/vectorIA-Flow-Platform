import { Module } from '@nestjs/common';
import { AnalysisController } from './analysis.controller';
import { SharedModule } from 'src/shared/shared.module';
import { PrismaModule } from 'src/core/services/prisma/prisma.module';
import { ANALYSIS_REPOSITORY, PROFESOR_REPOSITORY } from 'src/core/constants/constants';
import { AnalysisPrismaRepository } from 'src/infraestructure/persistence/analysis/analysis.prisma.repository';
import { AnalysisService } from 'src/core/services/analysis/analysis/analysis.service';
import { CreateAnalysisUseCase, DeleteAnalysisUseCase, GetAllAnalysisUseCase, GetOneAnalysisUseCase, UpdateAnalysisUseCase } from 'src/application/uses-cases/analysis';

@Module({
  imports:[SharedModule, PrismaModule],
      controllers: [AnalysisController],
      providers:[{
          provide: ANALYSIS_REPOSITORY,
          useClass: AnalysisPrismaRepository,
      },
      AnalysisService,
      CreateAnalysisUseCase,
      GetAllAnalysisUseCase,
      GetOneAnalysisUseCase,
      DeleteAnalysisUseCase,
      UpdateAnalysisUseCase,
      ],
      exports:[AnalysisService, ANALYSIS_REPOSITORY],
})
export class AnalysisModule {}
