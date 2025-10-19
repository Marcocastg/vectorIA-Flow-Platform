import { HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { createAnalysisDto, updateAnalysisDto } from 'src/application/dto/analysis';
import { ANALYSIS_REPOSITORY} from 'src/core/constants/constants';
import { Analysis } from 'src/core/entities/analysis/analysis.entity';
import type { AnalysisRepository } from 'src/core/repositories/analysis/analysis.repository';
import { ValidatorService } from 'src/shared/application/validation/validator.service';
import { BussinesRuleException } from 'src/shared/domain/exceptions/business-rule.exception';

@Injectable()
export class AnalysisService {
    constructor(
        @Inject(ANALYSIS_REPOSITORY)
        private repository: AnalysisRepository,
        private readonly validator: ValidatorService,
      ) {}

      async crearAnalysis(dto: createAnalysisDto): Promise<Analysis> {
          await this.validator.validate(dto, createAnalysisDto);
      
          const existe = await this.repository.findByTitle(dto.title);
          if (existe) {
            throw new BussinesRuleException(
              'The analysis already exists.',
              HttpStatus.BAD_REQUEST,
              {
                titulo: dto.title,
                codigoError: 'ANALYSIS_ALREADY_EXISTS',
              },
            );
          }
      
          const analysis = new Analysis(
            null,
            dto.title,
            dto.userId,
            dto.channelId,
          );
      
          return this.repository.save(analysis);
        }
      
        async listarAnalysis(): Promise<Analysis[]> {
          return this.repository.findAllActive();
        }
      
        async obtenerUnAnalysis(id: string): Promise<Analysis> {
          const existe = await this.repository.findById(id);
      
          if (!existe) {
            throw new BussinesRuleException(
              'The analysis does not exist.',
              HttpStatus.NOT_FOUND,
              {
                id: id,
                codigoError: 'ANALYSIS_NOT_FOUND',
              },
            );
          }
      
          return existe;
        }
      
        async actualizarAnalysis(
          id: string,
          dto: updateAnalysisDto,
        ): Promise<Analysis> {
            const analysisExists = await this.repository.findById(id);
            if (!analysisExists) {
                throw new NotFoundException(`Analysis with ID "${id}" not found`);
            }
          return this.repository.update(id, dto);
        }
      
        async eliminarAnalysis(id: string): Promise<Analysis> {
          const analysis = await this.obtenerUnAnalysis(id);
            
          return this.repository.delete(id);
        }
}
