import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { updatedataSetDto } from 'src/application/dto/dataSet';
import { dataSet } from 'src/core/entities/dataSet/dataSet.entity';
import { DataSetService } from 'src/core/services/dataSet/data-set/data-set.service';
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
