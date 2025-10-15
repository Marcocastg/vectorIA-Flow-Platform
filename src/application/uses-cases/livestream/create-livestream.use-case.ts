import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { createLivestreamDto } from 'src/application/dto/livestream';
import { createPlatformDto } from 'src/application/dto/platform';
import { Livestream } from 'src/core/entities/livestream/livestream.entity';
import { Platform } from 'src/core/entities/platform/platform.entity';
import { LivestreamService } from 'src/core/services/livestream/livestream/livestream.service';
import { PlatformService } from 'src/core/services/platform/platform/platform.service';
import { LivestreamEvent } from 'src/domain/events/livestream/livestream-creada.event';
import { PlatformEvent } from 'src/domain/events/platform/platform-creada.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class CreateLivestreamUseCase {
  constructor(
    private readonly livestreamService: LivestreamService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    dto: createLivestreamDto,
  ): Promise<Result<Livestream>> {
    
    const createDto = {...dto};

    try {
      const livestream = await this.livestreamService.crearLivestream(createDto);
      this.eventEmitter.emit('livestream.creado', new LivestreamEvent(livestream));
      return Result.ok(livestream);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
