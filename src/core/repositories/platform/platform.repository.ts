import { Platform } from "src/core/entities/platform/platform.entity";

export interface PlatformRepository {
  findById(id: string): Promise<Platform | null>;
  findByName(nombre: string): Promise<Platform | null>;
  findAllActive(): Promise<Platform[]>;
  save(platform: Platform): Promise<Platform>;
  update(id: string, platform: Partial<Platform>): Promise<Platform>;
  delete(id: string): Promise<Platform>;
}