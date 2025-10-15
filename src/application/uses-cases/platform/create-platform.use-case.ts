import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { createPlatformDto } from 'src/application/dto/platform';
import { Platform } from 'src/core/entities/platform/platform.entity';
import { PlatformService } from 'src/core/services/platform/platform/platform.service';
import { PlatformEvent } from 'src/domain/events/platform/platform-creada.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class CreatePlatformUseCase {
  constructor(
    private readonly platformService: PlatformService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    dto: createPlatformDto,
  ): Promise<Result<Platform>> {
    
    const createDto = {...dto};

    try {
      const platform = await this.platformService.crearPlatform(createDto);
      this.eventEmitter.emit('platform.creado', new PlatformEvent(platform));
      return Result.ok(platform);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
