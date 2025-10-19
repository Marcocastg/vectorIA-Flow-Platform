import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { dataSet } from 'src/core/entities/dataSet/dataSet.entity';
import { DataSetService } from 'src/core/services/dataSet/data-set/data-set.service';
import { DataSetEvent } from 'src/domain/events/dataSet/dataSet-creada.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class DeleteDataSetUseCase {
  constructor(
    private readonly dataSetService: DataSetService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(id: string): Promise<Result<dataSet>> {
    try {
      const dataSet = await this.dataSetService.eliminarDataSet(id);
      this.eventEmitter.emit(
        'dataSet.eliminada',
        new DataSetEvent(dataSet),
      );
      return Result.ok(dataSet);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
