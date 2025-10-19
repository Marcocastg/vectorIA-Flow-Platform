import { HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { createCategoryDto, updateCategoryDto } from 'src/application/dto/category';
import { CATEGORY_REPOSITORY } from 'src/core/constants/constants';
import { Category } from 'src/core/entities/category/category.entity';
import type { CategoryRepository } from 'src/core/repositories/category/category.repository';
import { ValidatorService } from 'src/shared/application/validation/validator.service';
import { BussinesRuleException } from 'src/shared/domain/exceptions/business-rule.exception';

@Injectable()
export class CategoryService {
    constructor(
        @Inject(CATEGORY_REPOSITORY)
        private repository: CategoryRepository,
        private readonly validator: ValidatorService,
      ) {}

      async crearCategory(dto: createCategoryDto): Promise<Category> {
          await this.validator.validate(dto, createCategoryDto);
      
          const existe = await this.repository.findByName(dto.name);
          if (existe) {
            throw new BussinesRuleException(
              'The category already exists.',
              HttpStatus.BAD_REQUEST,
              {
                name: dto.name,
                codigoError: 'CATEGORY_ALREADY_EXISTS',
              },
            );
          }
      
          const category = new Category(
            null,
            dto.name,
            dto.currentViewers,
            dto.platformId,
          );
      
          return this.repository.save(category);
        }
      
        async listarCategory(): Promise<Category[]> {
          return this.repository.findAllActive();
        }
      
        async obtenerUnCategory(id: string): Promise<Category> {
          const existe = await this.repository.findById(id);
      
          if (!existe) {
            throw new BussinesRuleException(
              'The category does not exist.',
              HttpStatus.NOT_FOUND,
              {
                id: id,
                codigoError: 'CATEGORY_NOT_FOUND',
              },
            );
          }
      
          return existe;
        }
      
        async actualizarCategory(
          id: string,
          dto: updateCategoryDto,
        ): Promise<Category> {
            const categoryExists = await this.repository.findById(id);
            if (!categoryExists) {
                throw new NotFoundException(`Category with ID "${id}" not found`);
            }
          return this.repository.update(id, dto);
        }
      
        async eliminarCategory(id: string): Promise<Category> {
          const category = await this.obtenerUnCategory(id);
            
          return this.repository.delete(id);
        }
}
