import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { VideoOnDemand } from 'src/core/entities/videoOnDemand/videoOnDemand.entity';
import { VideoOnDemandService } from 'src/core/services/videoOnDemand/video-on-demand/video-on-demand.service';
import { VideoOnDemandEvent } from 'src/domain/events/videoOnDemand/videoOnDemand-creada.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class GetOneVODUseCase {
  constructor(
    private readonly vodService: VideoOnDemandService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(id: string): Promise<Result<VideoOnDemand>> {
    try {
      const vod = await this.vodService.obtenerUnVOD(id);

      this.eventEmitter.emit(
        'vod.obtenida',
        new VideoOnDemandEvent(vod),
      );

      return Result.ok(vod);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
