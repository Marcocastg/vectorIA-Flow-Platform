import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from 'src/core/entities/user/user.entity';
import { UserService } from 'src/core/services/user/user/user.service';
import { UserEvent } from 'src/domain/events/user/user-creada.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class GetOneUserUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(id: string): Promise<Result<User>> {
    try {
      const user = await this.userService.obtenerUnUser(id);

      this.eventEmitter.emit(
        'user.obtenida',
        new UserEvent(user),
      );

      return Result.ok(user);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
