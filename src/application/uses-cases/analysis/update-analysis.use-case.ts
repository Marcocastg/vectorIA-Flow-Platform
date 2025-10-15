import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { updateAnalysisDto } from 'src/application/dto/analysis';
import { Analysis } from 'src/core/entities/analysis/analysis.entity';
import { AnalysisService } from 'src/core/services/analysis/analysis/analysis.service';
import { AnalysisEvent } from 'src/domain/events/analysis/analysis-creado.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class UpdateAnalysisUseCase {
  constructor(
    private readonly analysisService: AnalysisService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    id: string,
    dto: updateAnalysisDto,
  ): Promise<Result<Analysis>> {
    try {
      const analysis = await this.analysisService.actualizarAnalysis(
        id,
        dto,
      );
      this.eventEmitter.emit('analysis.update', new AnalysisEvent(analysis));
      return Result.ok(analysis);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
