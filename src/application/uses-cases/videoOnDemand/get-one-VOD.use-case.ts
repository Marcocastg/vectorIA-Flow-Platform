import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';import { Analysis } from 'src/core/entities/analysis/analysis.entity';
;
import { Livestream } from 'src/core/entities/livestream/livestream.entity';
import { Platform } from 'src/core/entities/platform/platform.entity';
import { User } from 'src/core/entities/user/user.entity';
import { VideoOnDemand } from 'src/core/entities/videoOnDemand/videoOnDemand.entity';
import { LivestreamService } from 'src/core/services/livestream/livestream/livestream.service';
import { PlatformService } from 'src/core/services/platform/platform/platform.service';
import { UserService } from 'src/core/services/user/user/user.service';
import { VideoOnDemandService } from 'src/core/services/videoOnDemand/video-on-demand/video-on-demand.service';
import { LivestreamEvent } from 'src/domain/events/livestream/livestream-creada.event';
import { PlatformEvent } from 'src/domain/events/platform/platform-creada.event';
import { UserEvent } from 'src/domain/events/user/user-creada.event';
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
