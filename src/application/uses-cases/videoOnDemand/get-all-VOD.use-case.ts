import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { VideoOnDemand } from 'src/core/entities/videoOnDemand/videoOnDemand.entity';
import { VideoOnDemandService } from 'src/core/services/videoOnDemand/video-on-demand/video-on-demand.service';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class GetAllVODUseCase {
  constructor(
    private readonly vodService: VideoOnDemandService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(): Promise<Result<VideoOnDemand[]>> {
    try {
      const vod = await this.vodService.listarVOD();

      return Result.okList(vod);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
