import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Platform } from 'src/core/entities/platform/platform.entity';
import { PlatformService } from 'src/core/services/platform/platform/platform.service';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class GetAllPlatformUseCase {
  constructor(
    private readonly platformService: PlatformService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(): Promise<Result<Platform[]>> {
    try {
      const platform = await this.platformService.listarPlatform();

      return Result.okList(platform);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
