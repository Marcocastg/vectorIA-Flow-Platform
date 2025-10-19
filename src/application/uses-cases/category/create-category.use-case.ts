import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { createCategoryDto } from 'src/application/dto/category';
import { Category } from 'src/core/entities/category/category.entity';
import { CategoryService } from 'src/core/services/category/category/category.service';
import { CategoryEvent } from 'src/domain/events/category/category-creada.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    dto: createCategoryDto,
  ): Promise<Result<Category>> {
    
    const createDto = {...dto};

    try {
      const category = await this.categoryService.crearCategory(createDto);
      this.eventEmitter.emit('category.creado', new CategoryEvent(category));
      return Result.ok(category);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
