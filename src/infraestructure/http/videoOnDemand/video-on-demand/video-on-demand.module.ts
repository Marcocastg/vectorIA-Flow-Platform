import { Module } from '@nestjs/common';
import { VideoOnDemandController } from './video-on-demand.controller';
import { SharedModule } from 'src/shared/shared.module';
import { PrismaModule } from 'src/core/services/prisma/prisma.module';
import { VIDEOONDEMAND_REPOSITORY } from 'src/core/constants/constants';
import { VODPrismaRepository } from 'src/infraestructure/persistence/videoOnDemand/vod.prisma.repository';
import { VideoOnDemandService } from 'src/core/services/videoOnDemand/video-on-demand/video-on-demand.service';
import * as index from 'src/application/uses-cases/videoOnDemand/index';

@Module({
  imports:[SharedModule, PrismaModule],
                    controllers: [VideoOnDemandController],
                    providers:[{
                        provide: VIDEOONDEMAND_REPOSITORY,
                        useClass: VODPrismaRepository,
                    },
                    VideoOnDemandService,
                    index.CreateVODUseCase,
                    index.GetAllVODUseCase,
                    index.GetOneVODUseCase,
                    index.DeleteVODUseCase,
                    index.UpdateVODUseCase,
                    ],
                    exports:[VideoOnDemandService, VIDEOONDEMAND_REPOSITORY],
})
export class VideoOnDemandModule {}
