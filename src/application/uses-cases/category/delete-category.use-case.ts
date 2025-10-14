import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Analysis } from 'src/core/entities/analysis/analysis.entity';
import { Categoria } from 'src/core/entities/categoria/categoria.entity';
import { Category } from 'src/core/entities/category/category.entity';
import { AnalysisService } from 'src/core/services/analysis/analysis/analysis.service';
import { CategoriaService } from 'src/core/services/categoria/categoria.service';
import { CategoryService } from 'src/core/services/category/category/category.service';
import { AnalysisEvent } from 'src/domain/events/analysis/analysis-creado.event';
import { CategoriaEvent } from 'src/domain/events/categoria/categoria-creada.event';
import { CategoryEvent } from 'src/domain/events/category/category-creada.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(id: string): Promise<Result<Category>> {
    try {
      const category = await this.categoryService.eliminarCategory(id);
      this.eventEmitter.emit(
        'category.eliminada',
        new CategoryEvent(category),
      );
      return Result.ok(category);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
