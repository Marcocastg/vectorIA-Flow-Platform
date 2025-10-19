
import { User } from 'src/core/entities/user/user.entity';
import { IDomainEvent } from 'src/shared/domain/events/domain-event.interface';

export class UserEncontradaEvent implements IDomainEvent {
  public readonly dateTimeOccurred: Date;
  public readonly user: User[];

  constructor(user: User[]) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }

  public getAggregateId(): string {
    return this.user.map((user) => user.uuid).join(', ');
  }
}
