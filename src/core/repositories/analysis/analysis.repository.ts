import { Analysis } from "src/core/entities/analysis/analysis.entity";

export interface AnalysisRepository {
  findById(id: string): Promise<Analysis | null>;
  findByTitle(title: string): Promise<Analysis | null>;
  findAllActive(): Promise<Analysis[]>;
  save(analysis: Analysis): Promise<Analysis>;
  update(id: string, analysis: Partial<Analysis>): Promise<Analysis>;
  delete(id: string): Promise<Analysis>;
}