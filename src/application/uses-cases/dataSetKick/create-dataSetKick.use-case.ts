import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { createAnalysisDto } from 'src/application/dto/analysis';
import { createCategoryDto } from 'src/application/dto/category';
import { createChannelDto } from 'src/application/dto/channel';
import { createdataSetDto } from 'src/application/dto/dataSet/create-dataSet.dto';
import { createdataSetKickDto } from 'src/application/dto/dataSetKick';
import { Analysis } from 'src/core/entities/analysis/analysis.entity';
import { Category } from 'src/core/entities/category/category.entity';
import { Channel } from 'src/core/entities/channel/channel.entity';
import { dataSet } from 'src/core/entities/dataSet/dataSet.entity';
import { dataSetKick } from 'src/core/entities/dataSetKick/dataSetKick.entity';
import { AnalysisService } from 'src/core/services/analysis/analysis/analysis.service';
import { CategoryService } from 'src/core/services/category/category/category.service';
import { ChannelService } from 'src/core/services/channel/channel/channel.service';
import { DataSetService } from 'src/core/services/dataSet/data-set/data-set.service';
import { DataSetKickService } from 'src/core/services/dataSetKick/data-set-kick/data-set-kick.service';
import { AnalysisEvent } from 'src/domain/events/analysis/analysis-creado.event';
import { CategoryEvent } from 'src/domain/events/category/category-creada.event';
import { ChannelEvent } from 'src/domain/events/channel/channel-creada.event';
import { DataSetEvent } from 'src/domain/events/dataSet/dataSet-creada.event';
import { DataSetKickEvent } from 'src/domain/events/dataSetKick/dataSetKick-creada.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class CreateDataSetKickUseCase {
  constructor(
    private readonly dataSetKickService: DataSetKickService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    dto: createdataSetKickDto,
  ): Promise<Result<dataSetKick>> {
    
    const createDto = {...dto};

    try {
      const dataSetKick = await this.dataSetKickService.crearDataSetKick(createDto);
      this.eventEmitter.emit('dataSetKick.creado', new DataSetKickEvent(dataSetKick));
      return Result.ok(dataSetKick);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
