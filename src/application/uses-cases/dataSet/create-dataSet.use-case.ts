import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { createdataSetDto } from 'src/application/dto/dataSet/create-dataSet.dto';
import { dataSet } from 'src/core/entities/dataSet/dataSet.entity';
import { DataSetService } from 'src/core/services/dataSet/data-set/data-set.service';
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
