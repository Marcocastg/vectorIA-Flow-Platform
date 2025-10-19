import { HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { createLivestreamDto, updateLivestreamDto } from 'src/application/dto/livestream';
import { LIVESTREAM_REPOSITORY } from 'src/core/constants/constants';
import { Livestream } from 'src/core/entities/livestream/livestream.entity';
import type { LivestreamRepository } from 'src/core/repositories/livestream/livestream.repository';
import { ValidatorService } from 'src/shared/application/validation/validator.service';
import { BussinesRuleException } from 'src/shared/domain/exceptions/business-rule.exception';


@Injectable()
export class LivestreamService {
    constructor(
        @Inject(LIVESTREAM_REPOSITORY)
        private repository: LivestreamRepository,
        private readonly validator: ValidatorService,
      ) {}

      async crearLivestream(dto: createLivestreamDto): Promise<Livestream> {
          await this.validator.validate(dto, createLivestreamDto);
      
          const existe = await this.repository.findByTitle(dto.title);
          if (existe) {
            throw new BussinesRuleException(
              'The livestream already exists.',
              HttpStatus.BAD_REQUEST,
              {
                title: dto.title,
                codigoError: 'LIVESTREAM_ALREADY_EXISTS',
              },
            );
          }
      
          const liveStream = new Livestream(
            null,
            dto.title,
            dto.thumbnailUrl,
            dto.language,
            dto.startedAt,
            dto.currentViewers,
            dto.matureContent,
            dto.channelId,
            dto.categoryId,
          );
      
          return this.repository.save(liveStream);
        }
      
        async listarLivestream(): Promise<Livestream[]> {
          return this.repository.findAllActive();
        }
      
        async obtenerUnLivestream(id: string): Promise<Livestream> {
          const existe = await this.repository.findById(id);
      
          if (!existe) {
            throw new BussinesRuleException(
              'The livestream does not exist.',
              HttpStatus.NOT_FOUND,
              {
                id: id,
                codigoError: 'LIVESTREAM_NOT_FOUND',
              },
            );
          }
      
          return existe;
        }
      
        async actualizarLivestream(
          id: string,
          dto: updateLivestreamDto,
        ): Promise<Livestream> {
            const LivestreamExists = await this.repository.findById(id);
            if (!LivestreamExists) {
                throw new NotFoundException(`Livestream with ID "${id}" not found`);
            }
          return this.repository.update(id, dto);
        }
      
        async eliminarLivestream(id: string): Promise<Livestream> {
          const livestream = await this.obtenerUnLivestream(id);
            
          return this.repository.delete(id);
        }
}
