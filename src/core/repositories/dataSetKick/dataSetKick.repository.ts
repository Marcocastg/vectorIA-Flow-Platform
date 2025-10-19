import { dataSetKick } from "src/core/entities/dataSetKick/dataSetKick.entity";

export interface DataSetKickRepository {
  findById(uuid: string): Promise<dataSetKick | null>;
  findByName(channelName: string): Promise<dataSetKick | null>;
  findAllActive(): Promise<dataSetKick[]>;
  save(dataSetKick: dataSetKick): Promise<dataSetKick>;
  update(uuid: string, dataSetKick: Partial<dataSetKick>): Promise<dataSetKick>;
  delete(uuid: string): Promise<dataSetKick>;
}