import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
;
import { Category } from 'src/core/entities/category/category.entity';
import { CategoryService } from 'src/core/services/category/category/category.service';
import { CategoryEvent } from 'src/domain/events/category/category-creada.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class GetOneCategoryUseCase {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(id: string): Promise<Result<Category>> {
    try {
      const category = await this.categoryService.obtenerUnCategory(id);

      this.eventEmitter.emit(
        'category.obtenida',
        new CategoryEvent(category),
      );

      return Result.ok(category);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
