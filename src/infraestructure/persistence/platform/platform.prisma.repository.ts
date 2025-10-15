import { Injectable } from "@nestjs/common";
import { Platform } from "src/core/entities/platform/platform.entity";
import { PlatformRepository } from "src/core/repositories/platform/platform.repository";
import { PrismaService } from "src/core/services/prisma/prisma.service";

@Injectable()
export class PlatformPrismaRepository implements PlatformRepository{
    constructor(private prisma: PrismaService) {}

    async findById(uuid: string): Promise<Platform | null> {
        const data = await this.prisma.platform.findUnique({
                                    where: { uuid },
        });
                                
        return data ? Platform.fromPrisma(data) : null;
    }
    
    async findByName(name: string): Promise<Platform | null> {
        const data = await this.prisma.platform.findUnique({
                                    where: { name },
        });
                                
        return data ? Platform.fromPrisma(data) : null;
    }

    async findAllActive(): Promise<Platform[]> {
        const data = await this.prisma.platform.findMany({});
                                
        const respuesta = Platform.fromPrismaList(data);
                                
        return respuesta;
    }

    async save(platform: Platform): Promise<Platform> {
        const data = await this.prisma.platform.create({
                                      data: {
                                        name: platform.name,
                                        url: platform.url,
                                        logoUrl: platform.logoUrl,
                                      },
                                    });
                        
        return Platform.fromPrisma(data);
    }

    async update(uuid: string, platform: Partial<Platform>): Promise<Platform> {
        const dataUpdate: any = {
                                name: platform.name,
                                url: platform.url,
                                logoUrl: platform.logoUrl,
                              };
                        
        const data = await this.prisma.platform.update({
                                            where: { uuid },
                                            data: dataUpdate,
        });
        
        return Platform.fromPrisma(data);
    }

    async delete(uuid: string): Promise<Platform> {
        const data = await this.prisma.platform.delete({
                                                  where: { uuid },
                                            });
                                            
        return Platform.fromPrisma(data);
    }
}