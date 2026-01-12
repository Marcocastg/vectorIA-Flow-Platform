import { Report } from "src/core/entities/report/report.entity";
import { IDomainEvent } from "src/shared/domain/events/domain-event.interface";

export class ReportEvent implements IDomainEvent {
    public readonly dateTimeOccurred: Date;
    public readonly report: Report;

    constructor(report: Report) {
        this.dateTimeOccurred = new Date();
        this.report = report;
    }   

    getAggregateId(): string {
        return this.report.uuid!;
    }
    
}