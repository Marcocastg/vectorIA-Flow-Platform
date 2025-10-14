import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Livestream } from 'src/core/entities/livestream/livestream.entity';
import { Platform } from 'src/core/entities/platform/platform.entity';
import { LivestreamService } from 'src/core/services/livestream/livestream/livestream.service';
import { PlatformService } from 'src/core/services/platform/platform/platform.service';
import { LivestreamEvent } from 'src/domain/events/livestream/livestream-creada.event';
import { PlatformEvent } from 'src/domain/events/platform/platform-creada.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class DeletePlatformUseCase {
  constructor(
    private readonly platformService: PlatformService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(id: string): Promise<Result<Platform>> {
    try {
      const platform = await this.platformService.eliminarPlatform(id);
      this.eventEmitter.emit(
        'platform.eliminada',
        new PlatformEvent(platform),
      );
      return Result.ok(platform);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
