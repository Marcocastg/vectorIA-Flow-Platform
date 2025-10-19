import { HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { createdataSetKickDto, updatedataSetKickDto } from 'src/application/dto/dataSetKick';
import { DATASETKICK_REPOSITORY } from 'src/core/constants/constants';
import { dataSetKick } from 'src/core/entities/dataSetKick/dataSetKick.entity';
import type { DataSetKickRepository } from 'src/core/repositories/dataSetKick/dataSetKick.repository';
import { ValidatorService } from 'src/shared/application/validation/validator.service';
import { BussinesRuleException } from 'src/shared/domain/exceptions/business-rule.exception';


@Injectable()
export class DataSetKickService {
    constructor(
        @Inject(DATASETKICK_REPOSITORY)
        private repository: DataSetKickRepository,
        private readonly validator: ValidatorService,
      ) {}

      async crearDataSetKick(dto: createdataSetKickDto): Promise<dataSetKick> {
          await this.validator.validate(dto, createdataSetKickDto);
      
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
      
          const dataSetChannelKick = new dataSetKick(
            null,
            dto.channelName,
            dto.channelPfp,
            dto.rank,
            dto.averageViewers,
            dto.hoursWatched,
            dto.maxViewers,
            dto.hoursStreamed,
            dto.totalFollowers,
            dto.language,
            dto.rankVariation,
            dto.fechaRegistro,
            dto.channelId,
          );
      
          return this.repository.save(dataSetChannelKick);
        }
      
        async listarDataSetKick(): Promise<dataSetKick[]> {
          return this.repository.findAllActive();
        }
      
        async obtenerUnDataSetKick(id: string): Promise<dataSetKick> {
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
      
        async actualizarDataSetKick(
          id: string,
          dto: updatedataSetKickDto,
        ): Promise<dataSetKick> {
            const dataSetExists = await this.repository.findById(id);
            if (!dataSetExists) {
                throw new NotFoundException(`Channel with ID "${id}" not found`);
            }
          return this.repository.update(id, dto);
        }
      
        async eliminarDataSetKick(id: string): Promise<dataSetKick> {
          const dataSetKick = await this.obtenerUnDataSetKick(id);
            
          return this.repository.delete(id);
        }
}
