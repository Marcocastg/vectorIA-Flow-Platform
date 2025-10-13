
import { dataSet } from "src/core/entities/dataSet/dataSet.entity";

export interface DataSetRepository {
  findById(id: string): Promise<dataSet | null>;
  findByName(nombre: string): Promise<dataSet | null>;
  findAllActive(): Promise<dataSet[]>;
  save(dataSet: dataSet): Promise<dataSet>;
  update(id: string, dataSet: Partial<dataSet>): Promise<dataSet>;
  delete(id: string): Promise<dataSet>;
}