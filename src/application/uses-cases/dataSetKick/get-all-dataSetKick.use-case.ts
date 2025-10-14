import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Analysis } from 'src/core/entities/analysis/analysis.entity';
import { Categoria } from 'src/core/entities/categoria/categoria.entity';
import { Category } from 'src/core/entities/category/category.entity';
import { Channel } from 'src/core/entities/channel/channel.entity';
import { dataSet } from 'src/core/entities/dataSet/dataSet.entity';
import { dataSetKick } from 'src/core/entities/dataSetKick/dataSetKick.entity';
import { AnalysisService } from 'src/core/services/analysis/analysis/analysis.service';
import { CategoriaService } from 'src/core/services/categoria/categoria.service';
import { CategoryService } from 'src/core/services/category/category/category.service';
import { ChannelService } from 'src/core/services/channel/channel/channel.service';
import { DataSetService } from 'src/core/services/dataSet/data-set/data-set.service';
import { DataSetKickService } from 'src/core/services/dataSetKick/data-set-kick/data-set-kick.service';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class GetAllDataSetKickUseCase {
  constructor(
    private readonly dataSetKickService: DataSetKickService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(): Promise<Result<dataSetKick[]>> {
    try {
      const allDataSetKick = await this.dataSetKickService.listarDataSetKick();

      return Result.okList(allDataSetKick);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
