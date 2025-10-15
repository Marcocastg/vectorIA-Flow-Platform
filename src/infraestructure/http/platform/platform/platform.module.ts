import { Module } from '@nestjs/common';
import { PlatformController } from './platform.controller';
import { SharedModule } from 'src/shared/shared.module';
import { PrismaModule } from 'src/core/services/prisma/prisma.module';
import { PLATFORM_REPOSITORY } from 'src/core/constants/constants';
import { PlatformService } from 'src/core/services/platform/platform/platform.service';
import * as index from 'src/application/uses-cases/platform/index';
import { PlatformPrismaRepository } from 'src/infraestructure/persistence/platform/platform.prisma.repository';

@Module({
  imports:[SharedModule, PrismaModule],
                controllers: [PlatformController],
                providers:[{
                    provide: PLATFORM_REPOSITORY,
                    useClass: PlatformPrismaRepository,
                },
                PlatformService,
                index.CreatePlatformUseCase,
                index.GetAllPlatformUseCase,
                index.GetOnePlatformUseCase,
                index.DeletePlatformUseCase,
                index.UpdatePlatformUseCase,
                ],
                exports:[PlatformService, PLATFORM_REPOSITORY],
  })
export class PlatformModule {}
