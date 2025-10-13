import { VideoOnDemand } from "src/core/entities/videoOnDemand/videoOnDemand.entity";

export interface VideoOnDemandRepository {
  findById(id: string): Promise<VideoOnDemand | null>;
  findByTitle(title: string): Promise<VideoOnDemand | null>;
  findAllActive(): Promise<VideoOnDemand[]>;
  save(videoOnDemand: VideoOnDemand): Promise<VideoOnDemand>;
  update(id: string, videoOnDemand: Partial<VideoOnDemand>): Promise<VideoOnDemand>;
  delete(id: string): Promise<VideoOnDemand>;
}