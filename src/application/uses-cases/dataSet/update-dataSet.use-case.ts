import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { updateAnalysisDto } from 'src/application/dto/analysis';
import { UpdateCategoriaDto } from 'src/application/dto/categoria';
import { updateCategoryDto } from 'src/application/dto/category';
import { updateChannelDto } from 'src/application/dto/channel';
import { updatedataSetDto } from 'src/application/dto/dataSet';
import { Analysis } from 'src/core/entities/analysis/analysis.entity';
import { Categoria } from 'src/core/entities/categoria/categoria.entity';
import { Category } from 'src/core/entities/category/category.entity';
import { Channel } from 'src/core/entities/channel/channel.entity';
import { dataSet } from 'src/core/entities/dataSet/dataSet.entity';
import { AnalysisService } from 'src/core/services/analysis/analysis/analysis.service';
import { CategoriaService } from 'src/core/services/categoria/categoria.service';
import { CategoryService } from 'src/core/services/category/category/category.service';
import { ChannelService } from 'src/core/services/channel/channel/channel.service';
import { DataSetService } from 'src/core/services/dataSet/data-set/data-set.service';
import { AnalysisEvent } from 'src/domain/events/analysis/analysis-creado.event';
import { CategoriaEvent } from 'src/domain/events/categoria/categoria-creada.event';
import { CategoryEvent } from 'src/domain/events/category/category-creada.event';
import { ChannelEvent } from 'src/domain/events/channel/channel-creada.event';
import { DataSetEvent } from 'src/domain/events/dataSet/dataSet-creada.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class UpdateDataSetUseCase {
  constructor(
    private readonly dataSetService: DataSetService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    id: string,
    dto: updatedataSetDto,
  ): Promise<Result<dataSet>> {
    try {
      const dataSet = await this.dataSetService.actualizarDataSet(
        id,
        dto,
      );
      this.eventEmitter.emit('dataSet.update', new DataSetEvent(dataSet));
      return Result.ok(dataSet);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
