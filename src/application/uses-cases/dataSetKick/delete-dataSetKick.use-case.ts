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
import { AnalysisEvent } from 'src/domain/events/analysis/analysis-creado.event';
import { CategoriaEvent } from 'src/domain/events/categoria/categoria-creada.event';
import { CategoryEvent } from 'src/domain/events/category/category-creada.event';
import { ChannelEvent } from 'src/domain/events/channel/channel-creada.event';
import { DataSetEvent } from 'src/domain/events/dataSet/dataSet-creada.event';
import { DataSetKickEvent } from 'src/domain/events/dataSetKick/dataSetKick-creada.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class DeleteDataSetKickUseCase {
  constructor(
    private readonly dataSetKickService: DataSetKickService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(id: string): Promise<Result<dataSetKick>> {
    try {
      const dataSetKick = await this.dataSetKickService.eliminarDataSetKick(id);
      this.eventEmitter.emit(
        'dataSetKick.eliminada',
        new DataSetKickEvent(dataSetKick),
      );
      return Result.ok(dataSetKick);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
