import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Report } from 'src/core/entities/report/report.entity';
import { ReportService } from 'src/core/services/report/report.service';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class GetAllReportUseCase {
  constructor(
    private readonly reportService: ReportService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(): Promise<Result<Report[]>> {
    try {
      const allreports = await this.reportService.listarReport();

      return Result.okList(allreports);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
