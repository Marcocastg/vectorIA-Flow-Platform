import { HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { createvideoOnDemandDto, updatevideoOnDemandDto } from 'src/application/dto/videoOnDemand';
import { VIDEOONDEMAND_REPOSITORY } from 'src/core/constants/constants';
import { VideoOnDemand } from 'src/core/entities/videoOnDemand/videoOnDemand.entity';
import type { VideoOnDemandRepository } from 'src/core/repositories/videoOnDemand/videoOnDemand.repository';
import { ValidatorService } from 'src/shared/application/validation/validator.service';
import { BussinesRuleException } from 'src/shared/domain/exceptions/business-rule.exception';


@Injectable()
export class VideoOnDemandService {
constructor(
        @Inject(VIDEOONDEMAND_REPOSITORY)
        private repository: VideoOnDemandRepository,
        private readonly validator: ValidatorService,
      ) {}

      async crearVOD(dto: createvideoOnDemandDto): Promise<VideoOnDemand> {
          await this.validator.validate(dto, createvideoOnDemandDto);
      
          const existe = await this.repository.findByTitle(dto.title);
          if (existe) {
            throw new BussinesRuleException(
              'The VOD already exists.',
              HttpStatus.BAD_REQUEST,
              {
                title: dto.title,
                codigoError: 'VOD_ALREADY_EXISTS',
              },
            );
          }
      
          const vod = new VideoOnDemand(
            null,
            dto.title,
            dto.duration,
            dto.views,
            dto.matureContent,
            dto.channelId,
          );
      
          return this.repository.save(vod);
        }
      
        async listarVOD(): Promise<VideoOnDemand[]> {
          return this.repository.findAllActive();
        }
      
        async obtenerUnVOD(id: string): Promise<VideoOnDemand> {
          const existe = await this.repository.findById(id);
      
          if (!existe) {
            throw new BussinesRuleException(
              'The VOD does not exist.',
              HttpStatus.NOT_FOUND,
              {
                id: id,
                codigoError: 'VOD_NOT_FOUND',
              },
            );
          }
      
          return existe;
        }
      
        async actualizarVOD(
          id: string,
          dto: updatevideoOnDemandDto,
        ): Promise<VideoOnDemand> {
            const VODExists = await this.repository.findById(id);
            if (!VODExists) {
                throw new NotFoundException(`VOD with ID "${id}" not found`);
            }
          return this.repository.update(id, dto);
        }
      
        async eliminarVOD(id: string): Promise<VideoOnDemand> {
          const vod = await this.obtenerUnVOD(id);
            
          return this.repository.delete(id);
        }
}
