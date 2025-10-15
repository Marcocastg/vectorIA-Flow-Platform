import { Module } from '@nestjs/common';
import { DataSetController } from './data-set.controller';
import { SharedModule } from 'src/shared/shared.module';
import { PrismaModule } from 'src/core/services/prisma/prisma.module';
import { DATASET_REPOSITORY } from 'src/core/constants/constants';
import { dataSetPrismaRepository } from 'src/infraestructure/persistence/dataSet/dataSet.prisma.repository';
import { DataSetService } from 'src/core/services/dataSet/data-set/data-set.service';
import * as index from 'src/application/uses-cases/dataSet/index';

@Module({
  imports:[SharedModule, PrismaModule],
          controllers: [DataSetController],
          providers:[{
              provide: DATASET_REPOSITORY,
              useClass: dataSetPrismaRepository,
          },
          DataSetService,
          index.CreateDataSetUseCase,
          index.GetAllDataSetUseCase,
          index.GetOneDataSetUseCase,
          index.DeleteDataSetUseCase,
          index.UpdateDataSetUseCase,
          ],
          exports:[DataSetService, DATASET_REPOSITORY],
})
export class DataSetModule {}
