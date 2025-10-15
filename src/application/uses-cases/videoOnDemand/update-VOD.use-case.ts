import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { updatevideoOnDemandDto } from 'src/application/dto/videoOnDemand';
import { VideoOnDemand } from 'src/core/entities/videoOnDemand/videoOnDemand.entity';
import { VideoOnDemandService } from 'src/core/services/videoOnDemand/video-on-demand/video-on-demand.service';
import { VideoOnDemandEvent } from 'src/domain/events/videoOnDemand/videoOnDemand-creada.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class UpdateVODUseCase {
  constructor(
    private readonly vodService: VideoOnDemandService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    id: string,
    dto: updatevideoOnDemandDto,
  ): Promise<Result<VideoOnDemand>> {
    try {
      const vod = await this.vodService.actualizarVOD(
        id,
        dto,
      );
      this.eventEmitter.emit('vod.update', new VideoOnDemandEvent(vod));
      return Result.ok(vod);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
