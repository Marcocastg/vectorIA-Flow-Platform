import { Report } from "src/core/entities/report/report.entity";

export interface ReportRepository {
    findById(uuid: string): Promise<Report | null>; 
    findByAIText(aiAnalysis: string): Promise<Report | null>;
    findAllActive(): Promise<Report[]>;
    save(report: Report): Promise<Report>;
    update(uuid: string, report: Partial<Report>): Promise<Report>;
    delete(uuid: string): Promise<Report>;
}