import { Analysis } from "src/core/entities/analysis/analysis.entity";

export interface AnalysisRepository {
  findById(uuid: string): Promise<Analysis | null>;
  findByTitle(title: string): Promise<Analysis | null>;
  findAllActive(): Promise<Analysis[]>;
  save(analysis: Analysis): Promise<Analysis>;
  update(uuid: string, analysis: Partial<Analysis>): Promise<Analysis>;
  delete(uuid: string): Promise<Analysis>;
}