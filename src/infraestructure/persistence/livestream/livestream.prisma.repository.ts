import { Injectable } from "@nestjs/common";
import { Livestream } from "src/core/entities/livestream/livestream.entity";
import { LivestreamRepository } from "src/core/repositories/livestream/livestream.repository";
import { PrismaService } from "src/core/services/prisma/prisma.service";

@Injectable()
export class LivestreamPrismaRepository implements LivestreamRepository{
    constructor(private prisma: PrismaService) {}

    async findById(uuid: string): Promise<Livestream | null> {
        const data = await this.prisma.livestream.findUnique({
                                    where: { uuid },
                                    include: {
                                        channel: {
                                            select: {
                                                uuid: false,
                                                name: true,
                                                followers: true,
                                                lastSeenAt: false,
                                                description: false,
                                        }
                                    },
                                    category: {
                                        select: {
                                            uuid: false,
                                            name: true,
                                            currentViewers: false,
                                        }
                                    }
                                }
                            });
                                
        return data ? Livestream.fromPrisma(data) : null;
    }

    async findByTitle(title: string): Promise<Livestream | null> {
        const data = await this.prisma.livestream.findUnique({
                                    where: { title },
                                    include: {
                                        channel: {
                                            select: {
                                                uuid: false,
                                                name: true,
                                                followers: true,
                                                lastSeenAt: false,
                                                description: false,
                                        }
                                    },
                                    category: {
                                        select: {
                                            uuid: false,
                                            name: true,
                                            currentViewers: false,
                                        }
                                    }
                                }
                            });
                                
        return data ? Livestream.fromPrisma(data) : null;
    }

    async findAllActive(): Promise<Livestream[]> {
        const data = await this.prisma.livestream.findMany({
                                    include: {
                                        channel: {
                                            select: {
                                                uuid: false,
                                                name: true,
                                                followers: true,
                                                lastSeenAt: false,
                                                description: false,
                                        }
                                    },
                                    category: {
                                        select: {
                                            uuid: false,
                                            name: true,
                                            currentViewers: false,
                                        }
                                    }
                                }
                            });
                                
        const respuesta = Livestream.fromPrismaList(data);
                                
        return respuesta;
    }

    async save(livestream: Livestream): Promise<Livestream> {
        const data = await this.prisma.livestream.create({
                                      data: {
                                        title: livestream.title,
                                        thumbnailUrl: livestream.thumbnailUrl,
                                        language: livestream.language,
                                        startedAt: livestream.startedAt,
                                        currentViewers: livestream.currentViewers,
                                        matureContent: livestream.matureContent,
                                        channel: {
                                          connect: {
                                            uuid: livestream.channelId,
                                          }
                                        },
                                        category: {
                                          connect: {
                                            uuid: livestream.categoryId,
                                          }
                                        },
                                      },
                                      include: {
                                                channel: {
                                            select: {
                                                uuid: false,
                                                name: true,
                                                followers: true,
                                                lastSeenAt: false,
                                                description: false,
                                        }
                                    },
                                                category: {
                                                    select: {
                                                        uuid: false,
                                                        name: true,
                                                        currentViewers: false,
                                                    }
                                                },
                                        }
                                    });
                        
        return Livestream.fromPrisma(data);
    }

    async update(uuid: string, livestream: Partial<Livestream>): Promise<Livestream> {
        const dataUpdate: any = {
                                title: livestream.title,
                                thumbnailUrl: livestream.thumbnailUrl,
                                language: livestream.language,
                                startedAt: livestream.startedAt,
                                currentViewers: livestream.currentViewers,
                                matureContent: livestream.matureContent,
                              };
                        
        if(livestream.channelId){
                                dataUpdate.channel = {
                                  connect: {
                                    uuid: livestream.channelId
                                  }
                };
        }

        if(livestream.categoryId){
                                dataUpdate.category = {
                                  connect: {
                                    uuid: livestream.categoryId
                                  }
                };
        }

                        
        const data = await this.prisma.livestream.update({
                                            where: { uuid },
                                            data: dataUpdate,
                                            include: {
                                                channel: {
                                            select: {
                                                    uuid: false,
                                                    name: true,
                                                    followers: true,
                                                    lastSeenAt: false,
                                                    description: false,
                                                    }
                                                },
                                                category: {
                                                    select: {
                                                        uuid: false,
                                                        name: true,
                                                        currentViewers: false,
                                                    }
                                                },
                                            }
            });
        return Livestream.fromPrisma(data);
    }

    async delete(uuid: string): Promise<Livestream> {
        const data = await this.prisma.livestream.delete({
                                                  where: { uuid },
            });
                                            
        return Livestream.fromPrisma(data);
    }

}