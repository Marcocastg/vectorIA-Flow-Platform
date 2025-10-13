import { dataSetKick } from "src/core/entities/dataSetKick/dataSetKick.entity";

export interface DataSetKickRepository {
  findById(id: string): Promise<dataSetKick | null>;
  findByName(nombre: string): Promise<dataSetKick | null>;
  findAllActive(): Promise<dataSetKick[]>;
  save(dataSetKick: dataSetKick): Promise<dataSetKick>;
  update(id: string, dataSetKick: Partial<dataSetKick>): Promise<dataSetKick>;
  delete(id: string): Promise<dataSetKick>;
}