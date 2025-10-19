
import { dataSet } from "src/core/entities/dataSet/dataSet.entity";

export interface DataSetRepository {
  findById(uuid: string): Promise<dataSet | null>;
  findByName(channelName: string): Promise<dataSet | null>;
  findAllActive(): Promise<dataSet[]>;
  save(dataSet: dataSet): Promise<dataSet>;
  update(uuid: string, dataSet: Partial<dataSet>): Promise<dataSet>;
  delete(uuid: string): Promise<dataSet>;
}