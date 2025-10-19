import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { dataSet } from 'src/core/entities/dataSet/dataSet.entity';
import { DataSetService } from 'src/core/services/dataSet/data-set/data-set.service';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class GetAllDataSetUseCase {
  constructor(
    private readonly dataSetService: DataSetService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(): Promise<Result<dataSet[]>> {
    try {
      const allDataSet= await this.dataSetService.listarDataSet();

      return Result.okList(allDataSet);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
