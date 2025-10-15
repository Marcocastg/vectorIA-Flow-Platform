import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Category } from 'src/core/entities/category/category.entity';
import { CategoryService } from 'src/core/services/category/category/category.service';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class GetAllCategoryUseCase {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(): Promise<Result<Category[]>> {
    try {
      const allcategory= await this.categoryService.listarCategory();

      return Result.okList(allcategory);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
