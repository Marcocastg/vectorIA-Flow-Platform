import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Analysis } from 'src/core/entities/analysis/analysis.entity';
import { Categoria } from 'src/core/entities/categoria/categoria.entity';
import { AnalysisService } from 'src/core/services/analysis/analysis/analysis.service';
import { CategoriaService } from 'src/core/services/categoria/categoria.service';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class GetAllAnalysisUseCase {
  constructor(
    private readonly analysisService: AnalysisService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(): Promise<Result<Analysis[]>> {
    try {
      const allanalysis = await this.analysisService.listarAnalysis();

      return Result.okList(allanalysis);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
