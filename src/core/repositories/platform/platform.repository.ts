import { Platform } from "src/core/entities/platform/platform.entity";

export interface PlatformRepository {
  findById(uuid: string): Promise<Platform | null>;
  findByName(nombre: string): Promise<Platform | null>;
  findAllActive(): Promise<Platform[]>;
  save(platform: Platform): Promise<Platform>;
  update(uuid: string, platform: Partial<Platform>): Promise<Platform>;
  delete(uuid: string): Promise<Platform>;
}