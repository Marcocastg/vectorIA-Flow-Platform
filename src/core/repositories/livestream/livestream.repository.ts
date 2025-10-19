import { dataSetKick } from "src/core/entities/dataSetKick/dataSetKick.entity";
import { Livestream } from "src/core/entities/livestream/livestream.entity";

export interface LivestreamRepository {
  findById(uuid: string): Promise<Livestream | null>;
  findByTitle(title: string): Promise<Livestream | null>;
  findAllActive(): Promise<Livestream[]>;
  save(livestream: Livestream): Promise<Livestream>;
  update(uuid: string, livestream: Partial<Livestream>): Promise<Livestream>;
  delete(uuid: string): Promise<Livestream>;
}