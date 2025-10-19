import { Analysis } from 'src/core/entities/analysis/analysis.entity';
import { IDomainEvent } from 'src/shared/domain/events/domain-event.interface';

export class AnalysisEvent implements IDomainEvent {
  public readonly dateTimeOccurred: Date;
  public readonly analysis: Analysis;

  constructor(analysis: Analysis) {
    this.dateTimeOccurred = new Date();
    this.analysis = analysis;
  }

  public getAggregateId(): string {
    
    return this.analysis.uuid!;
  }
}
