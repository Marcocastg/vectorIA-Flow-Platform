import { Injectable } from "@nestjs/common";
import { dataSetKick } from "src/core/entities/dataSetKick/dataSetKick.entity";
import { DataSetKickRepository } from "src/core/repositories/dataSetKick/dataSetKick.repository";
import { PrismaService } from "src/core/services/prisma/prisma.service";

@Injectable()
export class dataSetKickPrismaRepository implements DataSetKickRepository{
    constructor(private prisma: PrismaService) {}

    async findById(uuid: string): Promise<dataSetKick | null> {
        const data = await this.prisma.dataSetKick.findFirst({
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
                                },
                                    });
                                        
        return data ? dataSetKick.fromPrisma(data) : null;
    }

    async findByName(channelName: string): Promise<dataSetKick | null> {
        const data = await this.prisma.dataSetKick.findFirst({
                                            where: { channelName },
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
                                },
                                    });
                                        
        return data ? dataSetKick.fromPrisma(data) : null;
    }

    async findAllActive(): Promise<dataSetKick[]> {
        const data = await this.prisma.dataSetKick.findMany({
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
                                },
        });
                                        
        const respuesta = dataSetKick.fromPrismaList(data);
                                        
        return respuesta;
    }

    async save(dataSetKickdata: dataSetKick): Promise<dataSetKick> {
        const data = await this.prisma.dataSetKick.create({
                                        data: {
                                            channelName: dataSetKickdata.channelName,
                                            channelPfp: dataSetKickdata.channelPfp,
                                            rank: dataSetKickdata.rank,
                                            averageViewers: dataSetKickdata.averageViewers,
                                            hoursWatched: dataSetKickdata.hoursWatched,
                                            maxViewers: dataSetKickdata.maxViewers,
                                            hoursStreamed: dataSetKickdata.hoursStreamed,
                                            totalFollowers: dataSetKickdata.totalFollowers,
                                            language: dataSetKickdata.language,
                                            rankVariation: dataSetKickdata.rankVariation,
                                            fechaRegistro: dataSetKickdata.fechaRegistro,
                                            channel: {
                                          connect: {
                                            uuid: dataSetKickdata.channelId,
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
                                },
                                    });
                                
        return dataSetKick.fromPrisma(data);
    }

    async update(uuid: string, dataSetKickdata: Partial<dataSetKick>): Promise<dataSetKick> {
        const dataUpdate: any = {
                                        channelName: dataSetKickdata.channelName,
                                        channelPfp: dataSetKickdata.channelPfp,
                                        rank: dataSetKickdata.rank,
                                        averageViewers: dataSetKickdata.averageViewers,
                                        hoursWatched: dataSetKickdata.hoursWatched,
                                        maxViewers: dataSetKickdata.maxViewers,
                                        hoursStreamed: dataSetKickdata.hoursStreamed,
                                        totalFollowers: dataSetKickdata.totalFollowers,
                                        language: dataSetKickdata.language,
                                        rankVariation: dataSetKickdata.rankVariation,
                                        fechaRegistro: dataSetKickdata.fechaRegistro,
                                    };
                                
        const data = await this.prisma.dataSetKick.update({
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
                                },
        });

        return dataSetKick.fromPrisma(data);
    }

    async delete(uuid: string): Promise<dataSetKick> {
        const data = await this.prisma.dataSetKick.delete({
                        where: { uuid },
                    });
                                                    
        return dataSetKick.fromPrisma(data);
    }

    
}