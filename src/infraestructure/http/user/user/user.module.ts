import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { SharedModule } from 'src/shared/shared.module';
import { PrismaModule } from 'src/core/services/prisma/prisma.module';
import { USER_REPOSITORY } from 'src/core/constants/constants';
import { UserPrismaRepository } from 'src/infraestructure/persistence/user/user.prisma.repository';
import { UserService } from 'src/core/services/user/user/user.service';
import * as index from 'src/application/uses-cases/user/index';

@Module({
  imports:[SharedModule, PrismaModule],
                  controllers: [UserController],
                  providers:[{
                      provide: USER_REPOSITORY,
                      useClass: UserPrismaRepository,
                  },
                  UserService,
                  index.CreateUserUseCase,
                  index.GetAllUserUseCase,
                  index.GetOneUserUseCase,
                  index.DeleteUserUseCase,
                  index.UpdateUserUseCase,
                  ],
                  exports:[UserService, USER_REPOSITORY],
})
export class UserModule {}
