import { Module } from '@nestjs/common';
import { VideoOnDemandController } from './video-on-demand.controller';

@Module({
  controllers: [VideoOnDemandController]
})
export class VideoOnDemandModule {}
