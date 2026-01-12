import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/services/prisma/prisma.module';
import { SharedModule } from 'src/shared/shared.module';
import { ReportController } from './report.controller';
import { REPORT_REPOSITORY } from 'src/core/constants/constants';
import { ReportPrismaRepository } from 'src/infraestructure/persistence/report/report.prisma.repository';
import { ReportService } from 'src/core/services/report/report.service';
import * as index from 'src/application/uses-cases/report/index';


@Module({
    imports:[SharedModule, PrismaModule],
            controllers: [ReportController],
            providers:[{
                provide: REPORT_REPOSITORY,
                useClass: ReportPrismaRepository,
            },
            ReportService,
            index.CreateReportUseCase,
            index.GetAllReportUseCase,
            index.GetOneReportUseCase,
            index.DeleteReportUseCase,
            index.UpdateReportUseCase,
            ],
            exports:[ReportService, REPORT_REPOSITORY],
})
export class ReportModule {}
