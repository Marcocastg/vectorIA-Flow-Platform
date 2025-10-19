import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { createdataSetKickDto } from 'src/application/dto/dataSetKick';
import { dataSetKick } from 'src/core/entities/dataSetKick/dataSetKick.entity';
import { DataSetKickService } from 'src/core/services/dataSetKick/data-set-kick/data-set-kick.service';
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
