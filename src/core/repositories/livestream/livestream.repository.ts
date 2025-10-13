import { dataSetKick } from "src/core/entities/dataSetKick/dataSetKick.entity";
import { Livestream } from "src/core/entities/livestream/livestream.entity";

export interface LivestreamRepository {
  findById(id: string): Promise<Livestream | null>;
  findByTitle(title: string): Promise<Livestream | null>;
  findAllActive(): Promise<Livestream[]>;
  save(livestream: Livestream): Promise<Livestream>;
  update(id: string, livestream: Partial<Livestream>): Promise<Livestream>;
  delete(id: string): Promise<Livestream>;
}