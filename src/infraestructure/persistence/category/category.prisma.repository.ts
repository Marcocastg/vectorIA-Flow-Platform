import { PrismaService } from "src/core/services/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "src/core/repositories/category/category.repository";
import { Category } from "src/core/entities/category/category.entity";

@Injectable()
export class CategoryPrismaRepository implements CategoryRepository {
    constructor(private prisma: PrismaService) {}

    async findById(uuid: string): Promise<Category | null> {
        const data = await this.prisma.category.findFirst({
                    where: { uuid },
                    include: {
                        platform: {
                            select: {
                                uuid: false,
                                name: true,
                                url: true,
                                logoUrl: false,
                        }
                    },
                }
            });
                
        return data ? Category.fromPrisma(data) : null;
    }
    async findByName(name: string): Promise<Category | null> {
        const data = await this.prisma.category.findFirst({
                    where: { name },
                    include: {
                        platform: {
                            select: {
                                uuid: false,
                                name: true,
                                url: true,
                                logoUrl: false,
                        }
                    },
                }
            });
                
        return data ? Category.fromPrisma(data) : null;
    }
    async findAllActive(): Promise<Category[]> {
        const data = await this.prisma.category.findMany({
                    include: {
                        platform: {
                            select: {
                                uuid: false,
                                name: true,
                                url: true,
                                logoUrl: false,
                        }
                    },
                }
            });
                
        const respuesta = Category.fromPrismaList(data);
                
        return respuesta;
    }
    async save(category: Category): Promise<Category> {
        const data = await this.prisma.category.create({
                      data: {
                        name: category.name,
                        currentViewers: category.currentViewers,
                        platform: {
                          connect: {
                            uuid: category.platformId,
                          }
                        },
                      },
                      include: {
                                platform: {
                                    select: {
                                        uuid: false,
                                        name: true,
                                        url: true,
                                        logoUrl: false,
                                }
                            },
                        }
                    });
        
                    return Category.fromPrisma(data);
    }
    async update(uuid: string, category: Partial<Category>): Promise<Category> {
        const dataUpdate: any = {
                name: category.name,
                currentViewers: category.currentViewers,
              };
        
              if(category.platformId){
                dataUpdate.platform = {
                  connect: {
                    uuid: category.platformId
                  }
                };
              }
        
              const data = await this.prisma.category.update({
                            where: { uuid },
                            data: dataUpdate,
                            include: {
                                platform: {
                                    select: {
                                        uuid: false,
                                        name: true,
                                        url: true,
                                        logoUrl: false,
                                    }
                                },
                            }
                          });
                      return Category.fromPrisma(data);
    }
    async delete(uuid: string): Promise<Category> {
        const data = await this.prisma.category.delete({
                                  where: { uuid },
                            });
                            
        return Category.fromPrisma(data);
    }

    

}