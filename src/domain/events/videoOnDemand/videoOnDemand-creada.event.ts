import { Analysis } from 'src/core/entities/analysis/analysis.entity';
import { Categoria } from 'src/core/entities/categoria/categoria.entity';
import { Category } from 'src/core/entities/category/category.entity';
import { Channel } from 'src/core/entities/channel/channel.entity';
import { dataSet } from 'src/core/entities/dataSet/dataSet.entity';
import { dataSetKick } from 'src/core/entities/dataSetKick/dataSetKick.entity';
import { Livestream } from 'src/core/entities/livestream/livestream.entity';
import { Platform } from 'src/core/entities/platform/platform.entity';
import { User } from 'src/core/entities/user/user.entity';
import { VideoOnDemand } from 'src/core/entities/videoOnDemand/videoOnDemand.entity';
import { IDomainEvent } from 'src/shared/domain/events/domain-event.interface';

export class VideoOnDemandEvent implements IDomainEvent {
  public readonly dateTimeOccurred: Date;
  public readonly videoOnDemand: VideoOnDemand;

  constructor(videoOnDemand: VideoOnDemand) {
    this.dateTimeOccurred = new Date();
    this.videoOnDemand = videoOnDemand;
  }

  public getAggregateId(): string {
    return this.videoOnDemand.uuid;
  }
}
