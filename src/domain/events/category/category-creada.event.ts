import { Analysis } from 'src/core/entities/analysis/analysis.entity';
import { Categoria } from 'src/core/entities/categoria/categoria.entity';
import { Category } from 'src/core/entities/category/category.entity';
import { IDomainEvent } from 'src/shared/domain/events/domain-event.interface';

export class CategoryEvent implements IDomainEvent {
  public readonly dateTimeOccurred: Date;
  public readonly category: Category;

  constructor(category: Category) {
    this.dateTimeOccurred = new Date();
    this.category = category;
  }

  public getAggregateId(): string {
    return this.category.uuid;
  }
}
