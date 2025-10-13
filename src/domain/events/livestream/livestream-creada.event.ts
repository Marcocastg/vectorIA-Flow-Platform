import { Analysis } from 'src/core/entities/analysis/analysis.entity';
import { Categoria } from 'src/core/entities/categoria/categoria.entity';
import { Category } from 'src/core/entities/category/category.entity';
import { Channel } from 'src/core/entities/channel/channel.entity';
import { dataSet } from 'src/core/entities/dataSet/dataSet.entity';
import { dataSetKick } from 'src/core/entities/dataSetKick/dataSetKick.entity';
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
    return this.livestream.uuid;
  }
}
