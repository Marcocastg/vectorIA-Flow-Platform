import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from 'src/core/entities/user/user.entity';
import { UserService } from 'src/core/services/user/user/user.service';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class GetAllUserUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(): Promise<Result<User[]>> {
    try {
      const user = await this.userService.listarUser();

      return Result.okList(user);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
