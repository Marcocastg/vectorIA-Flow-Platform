import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { dataSetKick } from 'src/core/entities/dataSetKick/dataSetKick.entity';
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
