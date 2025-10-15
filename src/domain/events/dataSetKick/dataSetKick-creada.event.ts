
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
    return this.dataSetKick.uuid!;
  }
}
