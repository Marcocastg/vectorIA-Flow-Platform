import { Channel } from "src/core/entities/channel/channel.entity";

export interface ChannelRepository {
  findById(uuid: string): Promise<Channel | null>;
  findByName(name: string): Promise<Channel | null>;
  findAllActive(): Promise<Channel[]>;
  save(channel: Channel): Promise<Channel>;
  update(uuid: string, channel: Partial<Channel>): Promise<Channel>;
  delete(uuid: string): Promise<Channel>;
}