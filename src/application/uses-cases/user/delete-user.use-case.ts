import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Livestream } from 'src/core/entities/livestream/livestream.entity';
import { Platform } from 'src/core/entities/platform/platform.entity';
import { User } from 'src/core/entities/user/user.entity';
import { LivestreamService } from 'src/core/services/livestream/livestream/livestream.service';
import { PlatformService } from 'src/core/services/platform/platform/platform.service';
import { UserService } from 'src/core/services/user/user/user.service';
import { LivestreamEvent } from 'src/domain/events/livestream/livestream-creada.event';
import { PlatformEvent } from 'src/domain/events/platform/platform-creada.event';
import { UserEvent } from 'src/domain/events/user/user-creada.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(id: string): Promise<Result<User>> {
    try {
      const user = await this.userService.eliminarUser(id);
      this.eventEmitter.emit(
        'user.eliminada',
        new UserEvent(user),
      );
      return Result.ok(user);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
