import { HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { createChannelDto, updateChannelDto } from 'src/application/dto/channel';
import { CHANNEL_REPOSITORY } from 'src/core/constants/constants';
import { Channel } from 'src/core/entities/channel/channel.entity';
import type { ChannelRepository } from 'src/core/repositories/channel/channel.repository';
import { ValidatorService } from 'src/shared/application/validation/validator.service';
import { BussinesRuleException } from 'src/shared/domain/exceptions/business-rule.exception';

@Injectable()
export class ChannelService {
    constructor(
        @Inject(CHANNEL_REPOSITORY)
        private repository: ChannelRepository,
        private readonly validator: ValidatorService,
      ) {}

      async crearChannel(dto: createChannelDto): Promise<Channel> {
          await this.validator.validate(dto, createChannelDto);
      
          const existe = await this.repository.findByName(dto.name);
          if (existe) {
            throw new BussinesRuleException(
              'The channel already exists.',
              HttpStatus.BAD_REQUEST,
              {
                name: dto.name,
                codigoError: 'CHANNEL_ALREADY_EXISTS',
              },
            );
          }
      
          const channel = new Channel(
            null,
            dto.name,
            dto.followers,
            dto.lastSeenAt,
            dto.description,
            dto.platformId,
          );
      
          return this.repository.save(channel);
        }
      
        async listarChannel(): Promise<Channel[]> {
          return this.repository.findAllActive();
        }
      
        async obtenerUnChannel(id: string): Promise<Channel> {
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
      
        async actualizarChannel(
          id: string,
          dto: updateChannelDto,
        ): Promise<Channel> {
            const channelExists = await this.repository.findById(id);
            if (!channelExists) {
                throw new NotFoundException(`Channel with ID "${id}" not found`);
            }
          return this.repository.update(id, dto);
        }
      
        async eliminarChannel(id: string): Promise<Channel> {
          const channel = await this.obtenerUnChannel(id);
            
          return this.repository.delete(id);
        }
}
