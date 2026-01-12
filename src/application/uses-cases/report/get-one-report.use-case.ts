import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Report } from 'src/core/entities/report/report.entity';
import { ReportService } from 'src/core/services/report/report.service';
import { ReportEvent } from 'src/domain/events/report/report-creada.event';
;

import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class GetOneReportUseCase {
  constructor(
    private readonly reportService: ReportService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(id: string): Promise<Result<Report>> {
    try {
      const report = await this.reportService.obtenerUnReport(id);

      this.eventEmitter.emit(
        'report.obtenida',
        new ReportEvent(report),
      );

      return Result.ok(report);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
