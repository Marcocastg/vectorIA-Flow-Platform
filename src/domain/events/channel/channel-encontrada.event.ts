import { Analysis } from 'src/core/entities/analysis/analysis.entity';
import { Categoria } from 'src/core/entities/categoria/categoria.entity';
import { Category } from 'src/core/entities/category/category.entity';
import { Channel } from 'src/core/entities/channel/channel.entity';
import { IDomainEvent } from 'src/shared/domain/events/domain-event.interface';

export class ChannelEncontradaEvent implements IDomainEvent {
  public readonly dateTimeOccurred: Date;
  public readonly channel: Channel[];

  constructor(channel: Channel[]) {
    this.dateTimeOccurred = new Date();
    this.channel = channel;
  }

  public getAggregateId(): string {
    return this.channel.map((channel) => channel.uuid).join(', ');
  }
}
