
import { Livestream } from 'src/core/entities/livestream/livestream.entity';
import { IDomainEvent } from 'src/shared/domain/events/domain-event.interface';

export class LivestreamEvent implements IDomainEvent {
  public readonly dateTimeOccurred: Date;
  public readonly livestream: Livestream;

  constructor(livestream: Livestream) {
    this.dateTimeOccurred = new Date();
    this.livestream = livestream;
  }

  public getAggregateId(): string {
    return this.livestream.uuid!;
  }
}
