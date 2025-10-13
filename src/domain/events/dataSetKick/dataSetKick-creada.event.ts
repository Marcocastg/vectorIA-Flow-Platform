import { Analysis } from 'src/core/entities/analysis/analysis.entity';
import { Categoria } from 'src/core/entities/categoria/categoria.entity';
import { Category } from 'src/core/entities/category/category.entity';
import { Channel } from 'src/core/entities/channel/channel.entity';
import { dataSet } from 'src/core/entities/dataSet/dataSet.entity';
import { dataSetKick } from 'src/core/entities/dataSetKick/dataSetKick.entity';
import { IDomainEvent } from 'src/shared/domain/events/domain-event.interface';

export class DataSetKickEvent implements IDomainEvent {
  public readonly dateTimeOccurred: Date;
  public readonly dataSetKick: dataSetKick;

  constructor(dataSetKick: dataSetKick) {
    this.dateTimeOccurred = new Date();
    this.dataSetKick = dataSetKick;
  }

  public getAggregateId(): string {
    return this.dataSetKick.uuid;
  }
}
