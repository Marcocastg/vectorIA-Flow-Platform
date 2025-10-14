import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { createAnalysisDto } from 'src/application/dto/analysis';
import { createCategoryDto } from 'src/application/dto/category';
import { createChannelDto } from 'src/application/dto/channel';
import { createdataSetDto } from 'src/application/dto/dataSet/create-dataSet.dto';
import { Analysis } from 'src/core/entities/analysis/analysis.entity';
import { Category } from 'src/core/entities/category/category.entity';
import { Channel } from 'src/core/entities/channel/channel.entity';
import { dataSet } from 'src/core/entities/dataSet/dataSet.entity';
import { AnalysisService } from 'src/core/services/analysis/analysis/analysis.service';
import { CategoryService } from 'src/core/services/category/category/category.service';
import { ChannelService } from 'src/core/services/channel/channel/channel.service';
import { DataSetService } from 'src/core/services/dataSet/data-set/data-set.service';
import { AnalysisEvent } from 'src/domain/events/analysis/analysis-creado.event';
import { CategoryEvent } from 'src/domain/events/category/category-creada.event';
import { ChannelEvent } from 'src/domain/events/channel/channel-creada.event';
import { DataSetEvent } from 'src/domain/events/dataSet/dataSet-creada.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class CreateDataSetUseCase {
  constructor(
    private readonly dataSetService: DataSetService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    dto: createdataSetDto,
  ): Promise<Result<dataSet>> {
    
    const createDto = {...dto};

    try {
      const dataSet = await this.dataSetService.crearDataSet(createDto);
      this.eventEmitter.emit('dataSet.creado', new DataSetEvent(dataSet));
      return Result.ok(dataSet);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
