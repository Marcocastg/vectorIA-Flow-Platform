import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { createUserDto } from 'src/application/dto/user';
import { User } from 'src/core/entities/user/user.entity';
import { UserService } from 'src/core/services/user/user/user.service';
import { UserEvent } from 'src/domain/events/user/user-creada.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    dto: createUserDto,
  ): Promise<Result<User>> {
    
    const createDto = {...dto};

    try {
      const user = await this.userService.crearUser(createDto);
      this.eventEmitter.emit('user.creado', new UserEvent(user));
      return Result.ok(user);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
