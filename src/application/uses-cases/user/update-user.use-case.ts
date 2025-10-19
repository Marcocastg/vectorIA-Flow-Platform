import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { updateUserDto } from 'src/application/dto/user';
import { User } from 'src/core/entities/user/user.entity';
import { UserService } from 'src/core/services/user/user/user.service';
import { UserEvent } from 'src/domain/events/user/user-creada.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    id: string,
    dto: updateUserDto,
  ): Promise<Result<User>> {
    try {
      const user = await this.userService.actualizarUser(
        id,
        dto,
      );
      this.eventEmitter.emit('user.update', new UserEvent(user));
      return Result.ok(user);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
