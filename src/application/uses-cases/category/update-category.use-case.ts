import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { updateCategoryDto } from 'src/application/dto/category';
import { Category } from 'src/core/entities/category/category.entity';
import { CategoryService } from 'src/core/services/category/category/category.service';
import { CategoryEvent } from 'src/domain/events/category/category-creada.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    id: string,
    dto: updateCategoryDto,
  ): Promise<Result<Category>> {
    try {
      const category = await this.categoryService.actualizarCategory(
        id,
        dto,
      );
      this.eventEmitter.emit('category.update', new CategoryEvent(category));
      return Result.ok(category);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
