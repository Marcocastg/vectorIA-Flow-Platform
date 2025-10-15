
import { Channel } from 'src/core/entities/channel/channel.entity';
import { IDomainEvent } from 'src/shared/domain/events/domain-event.interface';

export class ChannelEvent implements IDomainEvent {
  public readonly dateTimeOccurred: Date;
  public readonly channel: Channel;

  constructor(channel: Channel) {
    this.dateTimeOccurred = new Date();
    this.channel = channel;
  }

  public getAggregateId(): string {
    return this.channel.uuid!;
  }
}
