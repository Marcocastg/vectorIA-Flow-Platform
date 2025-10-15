
import { Platform } from 'src/core/entities/platform/platform.entity';
import { IDomainEvent } from 'src/shared/domain/events/domain-event.interface';

export class PlatformEvent implements IDomainEvent {
  public readonly dateTimeOccurred: Date;
  public readonly platform: Platform;

  constructor(platform: Platform) {
    this.dateTimeOccurred = new Date();
    this.platform = platform;
  }

  public getAggregateId(): string {
    return this.platform.uuid!;
  }
}
