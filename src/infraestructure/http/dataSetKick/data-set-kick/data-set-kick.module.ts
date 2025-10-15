import { Module } from '@nestjs/common';
import { DataSetKickController } from './data-set-kick.controller';

@Module({
  controllers: [DataSetKickController]
})
export class DataSetKickModule {}
