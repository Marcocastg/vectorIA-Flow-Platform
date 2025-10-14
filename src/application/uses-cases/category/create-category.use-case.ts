import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { createAnalysisDto } from 'src/application/dto/analysis';
import { createCategoryDto } from 'src/application/dto/category';
import { Analysis } from 'src/core/entities/analysis/analysis.entity';
import { Category } from 'src/core/entities/category/category.entity';
import { AnalysisService } from 'src/core/services/analysis/analysis/analysis.service';
import { CategoryService } from 'src/core/services/category/category/category.service';
import { AnalysisEvent } from 'src/domain/events/analysis/analysis-creado.event';
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
      this.eventEmitter.emit('analysis.creado', new CategoryEvent(category));
      return Result.ok(category);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
