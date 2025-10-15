import { Module } from '@nestjs/common';
import { LivestreamController } from './livestream.controller';
import { SharedModule } from 'src/shared/shared.module';
import { PrismaModule } from 'src/core/services/prisma/prisma.module';
import { LIVESTREAM_REPOSITORY } from 'src/core/constants/constants';
import { LivestreamPrismaRepository } from 'src/infraestructure/persistence/livestream/livestream.prisma.repository';
import { LivestreamService } from 'src/core/services/livestream/livestream/livestream.service';
import * as index from 'src/application/uses-cases/livestream/index';

@Module({
  imports:[SharedModule, PrismaModule],
              controllers: [LivestreamController],
              providers:[{
                  provide: LIVESTREAM_REPOSITORY,
                  useClass: LivestreamPrismaRepository,
              },
              LivestreamService,
              index.CreateLivestreamUseCase,
              index.GetAllLivestreamUseCase,
              index.GetOneLivestreamUseCase,
              index.DeleteLivestreamUseCase,
              index.UpdateLivestreamUseCase,
              ],
              exports:[LivestreamService, LIVESTREAM_REPOSITORY],
})
export class LivestreamModule {}
