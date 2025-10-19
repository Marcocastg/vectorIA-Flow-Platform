import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { createvideoOnDemandDto } from 'src/application/dto/videoOnDemand';
import { VideoOnDemand } from 'src/core/entities/videoOnDemand/videoOnDemand.entity';
import { VideoOnDemandService } from 'src/core/services/videoOnDemand/video-on-demand/video-on-demand.service';
import { VideoOnDemandEvent } from 'src/domain/events/videoOnDemand/videoOnDemand-creada.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class CreateVODUseCase {
  constructor(
    private readonly vodService: VideoOnDemandService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    dto: createvideoOnDemandDto,
  ): Promise<Result<VideoOnDemand>> {
    
    const createDto = {...dto};

    try {
      const vod = await this.vodService.crearVOD(createDto);
      this.eventEmitter.emit('vod.creado', new VideoOnDemandEvent(vod));
      return Result.ok(vod);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
