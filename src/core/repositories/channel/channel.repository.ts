import { Channel } from "src/core/entities/channel/channel.entity";

export interface ChannelRepository {
  findById(id: string): Promise<Channel | null>;
  findByName(nombre: string): Promise<Channel | null>;
  findAllActive(): Promise<Channel[]>;
  save(channel: Channel): Promise<Channel>;
  update(id: string, channel: Partial<Channel>): Promise<Channel>;
  delete(id: string): Promise<Channel>;
}