import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UpdateReportDto } from 'src/application/dto/report';
import { Report } from 'src/core/entities/report/report.entity';
import { ReportService } from 'src/core/services/report/report.service';
import { ReportEvent } from 'src/domain/events/report/report-creada.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class UpdateReportUseCase {
  constructor(
    private readonly reportService: ReportService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    id: string,
    dto: UpdateReportDto,
  ): Promise<Result<Report>> {
    try {
      const report = await this.reportService.actualizarReport(
        id,
        dto,
      );
      this.eventEmitter.emit('report.update', new ReportEvent(report));
      return Result.ok(report);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
