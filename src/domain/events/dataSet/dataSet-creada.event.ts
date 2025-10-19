
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
    return this.dataSet.uuid!;
  }
}
