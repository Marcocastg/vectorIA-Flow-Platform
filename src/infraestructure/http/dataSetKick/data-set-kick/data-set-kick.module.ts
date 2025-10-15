import { Module } from '@nestjs/common';
import { DataSetKickController } from './data-set-kick.controller';
import { SharedModule } from 'src/shared/shared.module';
import { PrismaModule } from 'src/core/services/prisma/prisma.module';
import { DATASETKICK_REPOSITORY } from 'src/core/constants/constants';
import { DataSetKickService } from 'src/core/services/dataSetKick/data-set-kick/data-set-kick.service';
import * as index from 'src/application/uses-cases/dataSetKick/index';
import { dataSetKickPrismaRepository } from 'src/infraestructure/persistence/dataSetKick/dataSetKick.prisma.repository';

@Module({
  imports:[SharedModule, PrismaModule],
            controllers: [DataSetKickController],
            providers:[{
                provide: DATASETKICK_REPOSITORY,
                useClass: dataSetKickPrismaRepository,
            },
            DataSetKickService,
            index.CreateDataSetKickUseCase,
            index.GetAllDataSetKickUseCase,
            index.GetOneDataSetKickUseCase,
            index.DeleteDataSetKickUseCase,
            index.UpdateDataSetKickUseCase,
            ],
            exports:[DataSetKickService, DATASETKICK_REPOSITORY],
})
export class DataSetKickModule {}
