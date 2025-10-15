import { Module } from '@nestjs/common';
import { LivestreamController } from './livestream.controller';

@Module({
  controllers: [LivestreamController]
})
export class LivestreamModule {}
