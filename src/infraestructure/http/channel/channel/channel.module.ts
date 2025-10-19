import { Module } from '@nestjs/common';
import { ChannelController } from './channel.controller';
import { SharedModule } from 'src/shared/shared.module';
import { PrismaModule } from 'src/core/services/prisma/prisma.module';
import { CHANNEL_REPOSITORY } from 'src/core/constants/constants';
import { ChannelPrismaRepository } from 'src/infraestructure/persistence/channel/channel.prisma.repository';
import { ChannelService } from 'src/core/services/channel/channel/channel.service';
import * as index from 'src/application/uses-cases/channel/index';

@Module({
  imports:[SharedModule, PrismaModule],
        controllers: [ChannelController],
        providers:[{
            provide: CHANNEL_REPOSITORY,
            useClass: ChannelPrismaRepository,
        },
        ChannelService,
        index.CreateChannelUseCase,
        index.GetAllChannelUseCase,
        index.GetOneChannelUseCase,
        index.DeleteChannelUseCase,
        index.UpdateChannelUseCase,
        ],
        exports:[ChannelService, CHANNEL_REPOSITORY],
})
export class ChannelModule {}
