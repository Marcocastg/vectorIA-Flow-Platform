import { HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { createdataSetDto, updatedataSetDto } from 'src/application/dto/dataSet';
import { DATASET_REPOSITORY } from 'src/core/constants/constants';
import { dataSet } from 'src/core/entities/dataSet/dataSet.entity';
import type { DataSetRepository } from 'src/core/repositories/dataSet/dataSet.repository';
import { ValidatorService } from 'src/shared/application/validation/validator.service';
import { BussinesRuleException } from 'src/shared/domain/exceptions/business-rule.exception';


@Injectable()
export class DataSetService {
    constructor(
        @Inject(DATASET_REPOSITORY)
        private repository: DataSetRepository,
        private readonly validator: ValidatorService,
      ) {}

      async crearDataSet(dto: createdataSetDto): Promise<dataSet> {
          await this.validator.validate(dto, createdataSetDto);
      
          const existe = await this.repository.findByName(dto.channelName);
          if (existe) {
            throw new BussinesRuleException(
              'The channel already exists.',
              HttpStatus.BAD_REQUEST,
              {
                name: dto.channelName,
                codigoError: 'CHANNEL_ALREADY_EXISTS',
              },
            );
          }
      
          const dataSetTwitch = new dataSet(
            null,
            dto.channelName,
            dto.averageViewers,
            dto.hoursWatched,
            dto.maxViewers,
            dto.minutesStreamed,
            dto.followersGained,
            dto.totalFollowers,
            dto.rank,
            dto.fechaRegistro,
            dto.channelId,
          );
      
          return this.repository.save(dataSetTwitch);
        }
      
        async listarDataSet(): Promise<dataSet[]> {
          return this.repository.findAllActive();
        }
      
        async obtenerUnDataSet(id: string): Promise<dataSet> {
          const existe = await this.repository.findById(id);
      
          if (!existe) {
            throw new BussinesRuleException(
              'The channel does not exist.',
              HttpStatus.NOT_FOUND,
              {
                id: id,
                codigoError: 'CHANNEL_NOT_FOUND',
              },
            );
          }
      
          return existe;
        }
      
        async actualizarDataSet(
          id: string,
          dto: updatedataSetDto,
        ): Promise<dataSet> {
            const dataSetExists = await this.repository.findById(id);
            if (!dataSetExists) {
                throw new NotFoundException(`Channel with ID "${id}" not found`);
            }
          return this.repository.update(id, dto);
        }
      
        async eliminarDataSet(id: string): Promise<dataSet> {
          const dataSet = await this.obtenerUnDataSet(id);
            
          return this.repository.delete(id);
        }
}
