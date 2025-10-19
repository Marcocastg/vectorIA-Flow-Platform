import { Injectable } from "@nestjs/common";
import { VideoOnDemand } from "src/core/entities/videoOnDemand/videoOnDemand.entity";
import { VideoOnDemandRepository } from "src/core/repositories/videoOnDemand/videoOnDemand.repository";
import { PrismaService } from "src/core/services/prisma/prisma.service";

@Injectable()
export class VODPrismaRepository implements VideoOnDemandRepository{
    constructor(private prisma: PrismaService) {}

    async findById(uuid: string): Promise<VideoOnDemand | null> {
        const data = await this.prisma.videoOnDemand.findFirst({
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
                                        }
                                    });
                                        
        return data ? VideoOnDemand.fromPrisma(data) : null;
    }
    
    async findByTitle(title: string): Promise<VideoOnDemand | null> {
        const data = await this.prisma.videoOnDemand.findFirst({
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
                                        }
                                    });
                                        
        return data ? VideoOnDemand.fromPrisma(data) : null;
    }

    async findAllActive(): Promise<VideoOnDemand[]> {
        const data = await this.prisma.videoOnDemand.findMany({
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
                                        }
                                    });
                                        
        const respuesta = VideoOnDemand.fromPrismaList(data);
                                        
        return respuesta;
    }

    async save(videoOnDemand: VideoOnDemand): Promise<VideoOnDemand> {
        const data = await this.prisma.videoOnDemand.create({
                                              data: {
                                                title: videoOnDemand.title,
                                                duration: videoOnDemand.duration,
                                                views: videoOnDemand.views,
                                                matureContent: videoOnDemand.matureContent,
                                                channel: {
                                                  connect: {
                                                    uuid: videoOnDemand.channelId,
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
                                                }
                                            });
                                
        return VideoOnDemand.fromPrisma(data);
    }

    async update(uuid: string, videoOnDemand: Partial<VideoOnDemand>): Promise<VideoOnDemand> {
        const dataUpdate: any = {
                                        title: videoOnDemand.title,
                                        duration: videoOnDemand.duration,
                                        views: videoOnDemand.views,
                                        matureContent: videoOnDemand.matureContent,
                                };
                                
                if(videoOnDemand.channelId){
                                        dataUpdate.channel = {
                                          connect: {
                                            uuid: videoOnDemand.channelId
                                          }
                        };
                }
        
                                
                const data = await this.prisma.videoOnDemand.update({
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
                                                    }
                    });
        return VideoOnDemand.fromPrisma(data);
    }

    async delete(uuid: string): Promise<VideoOnDemand> {
        const data = await this.prisma.videoOnDemand.delete({
                                                          where: { uuid },
                    });
                                                    
        return VideoOnDemand.fromPrisma(data);
    }
}