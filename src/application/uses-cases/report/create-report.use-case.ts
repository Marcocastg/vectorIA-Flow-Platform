import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { createReportDto } from 'src/application/dto/report';
import { Report } from 'src/core/entities/report/report.entity';
import { ReportService } from 'src/core/services/report/report.service';
import { ReportEvent } from 'src/domain/events/report/report-creada.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class CreateReportUseCase {
  constructor(
    private readonly reportService: ReportService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    dto: createReportDto,
  ): Promise<Result<Report>> {
    
    const createDto = {...dto};

    try {
      const report = await this.reportService.crearReport(createDto);
      this.eventEmitter.emit('report.creado', new ReportEvent(report));
      return Result.ok(report);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
