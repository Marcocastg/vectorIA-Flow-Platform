import { Injectable } from "@nestjs/common";
import { Channel } from "src/core/entities/channel/channel.entity";
import { ChannelRepository } from "src/core/repositories/channel/channel.repository";
import { PrismaService } from "src/core/services/prisma/prisma.service";

@Injectable()
export class ChannelPrismaRepository implements ChannelRepository{
    constructor(private prisma: PrismaService) {}

    async findById(uuid: string): Promise<Channel | null> {
        const data = await this.prisma.channel.findFirst({
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
                        
        return data ? Channel.fromPrisma(data) : null;
    }

    async findByName(name: string): Promise<Channel | null> {
        const data = await this.prisma.channel.findFirst({
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
                        
        return data ? Channel.fromPrisma(data) : null;
    }

    async findAllActive(): Promise<Channel[]> {
        const data = await this.prisma.channel.findMany({
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
                        
        const respuesta = Channel.fromPrismaList(data);
                        
        return respuesta;
    }

    async save(channel: Channel): Promise<Channel> {
        const data = await this.prisma.channel.create({
                              data: {
                                name: channel.name,
                                followers: channel.followers,
                                lastSeenAt: channel.lastSeenAt,
                                description: channel.description,
                                platform: {
                                  connect: {
                                    uuid: channel.platformId,
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
                
        return Channel.fromPrisma(data);
    }

    async update(uuid: string, channel: Partial<Channel>): Promise<Channel> {
        const dataUpdate: any = {
                        name: channel.name,
                        followers: channel.followers,
                        lastSeenAt: channel.lastSeenAt,
                        description: channel.description,
                      };
                
                      if(channel.platformId){
                        dataUpdate.platform = {
                          connect: {
                            uuid: channel.platformId
                          }
                        };
                      }
                
                      const data = await this.prisma.channel.update({
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
        return Channel.fromPrisma(data);
    }

    async delete(uuid: string): Promise<Channel> {
        const data = await this.prisma.channel.delete({
                                          where: { uuid },
                                    });
                                    
        return Channel.fromPrisma(data);
    }

}