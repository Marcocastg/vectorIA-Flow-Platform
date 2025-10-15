import { Module } from '@nestjs/common';
import { DataSetController } from './data-set.controller';

@Module({
  controllers: [DataSetController]
})
export class DataSetModule {}
