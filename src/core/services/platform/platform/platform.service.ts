import { HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { createPlatformDto, updatePlatformDto } from 'src/application/dto/platform';
import { PLATFORM_REPOSITORY } from 'src/core/constants/constants';
import { Platform } from 'src/core/entities/platform/platform.entity';
import type { PlatformRepository } from 'src/core/repositories/platform/platform.repository';
import { ValidatorService } from 'src/shared/application/validation/validator.service';
import { BussinesRuleException } from 'src/shared/domain/exceptions/business-rule.exception';


@Injectable()
export class PlatformService {
    constructor(
        @Inject(PLATFORM_REPOSITORY)
        private repository: PlatformRepository,
        private readonly validator: ValidatorService,
      ) {}

      async crearPlatform(dto: createPlatformDto): Promise<Platform> {
          await this.validator.validate(dto, createPlatformDto);
      
          const existe = await this.repository.findByName(dto.name);
          if (existe) {
            throw new BussinesRuleException(
              'The platform already exists.',
              HttpStatus.BAD_REQUEST,
              {
                name: dto.name,
                codigoError: 'PLATFORM_ALREADY_EXISTS',
              },
            );
          }
      
          const platform = new Platform(
            null,
            dto.name,
            dto.url,
            dto.logoUrl,
          );
      
          return this.repository.save(platform);
        }
      
        async listarPlatform(): Promise<Platform[]> {
          return this.repository.findAllActive();
        }
      
        async obtenerUnPlatform(id: string): Promise<Platform> {
          const existe = await this.repository.findById(id);
      
          if (!existe) {
            throw new BussinesRuleException(
              'The platform does not exist.',
              HttpStatus.NOT_FOUND,
              {
                id: id,
                codigoError: 'PLATFORM_NOT_FOUND',
              },
            );
          }
      
          return existe;
        }
      
        async actualizarPlatform(
          id: string,
          dto: updatePlatformDto,
        ): Promise<Platform> {
            const PlatformExists = await this.repository.findById(id);
            if (!PlatformExists) {
                throw new NotFoundException(`Platform with ID "${id}" not found`);
            }
          return this.repository.update(id, dto);
        }
      
        async eliminarPlatform(id: string): Promise<Platform> {
          const platform = await this.obtenerUnPlatform(id);
            
          return this.repository.delete(id);
        }
}
