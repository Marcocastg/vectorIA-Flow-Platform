
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
    return this.videoOnDemand.uuid!;
  }
}
