import { Analysis } from 'src/core/entities/analysis/analysis.entity';
import { Categoria } from 'src/core/entities/categoria/categoria.entity';
import { Category } from 'src/core/entities/category/category.entity';
import { Channel } from 'src/core/entities/channel/channel.entity';
import { dataSet } from 'src/core/entities/dataSet/dataSet.entity';
import { IDomainEvent } from 'src/shared/domain/events/domain-event.interface';

export class DataSetEvent implements IDomainEvent {
  public readonly dateTimeOccurred: Date;
  public readonly dataSet: dataSet;

  constructor(dataSet: dataSet) {
    this.dateTimeOccurred = new Date();
    this.dataSet = dataSet;
  }

  public getAggregateId(): string {
    return this.dataSet.uuid;
  }
}
