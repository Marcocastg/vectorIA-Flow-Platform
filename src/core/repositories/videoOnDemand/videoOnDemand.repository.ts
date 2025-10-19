import { VideoOnDemand } from "src/core/entities/videoOnDemand/videoOnDemand.entity";

export interface VideoOnDemandRepository {
  findById(uuid: string): Promise<VideoOnDemand | null>;
  findByTitle(title: string): Promise<VideoOnDemand | null>;
  findAllActive(): Promise<VideoOnDemand[]>;
  save(videoOnDemand: VideoOnDemand): Promise<VideoOnDemand>;
  update(uuid: string, videoOnDemand: Partial<VideoOnDemand>): Promise<VideoOnDemand>;
  delete(uuid: string): Promise<VideoOnDemand>;
}