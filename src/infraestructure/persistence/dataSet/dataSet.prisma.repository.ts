import { Injectable } from "@nestjs/common";
import { dataSet } from "src/core/entities/dataSet/dataSet.entity";
import { DataSetRepository } from "src/core/repositories/dataSet/dataSet.repository";
import { PrismaService } from "src/core/services/prisma/prisma.service";

@Injectable()
export class dataSetPrismaRepository implements DataSetRepository{
    constructor(private prisma: PrismaService) {}

    async findById(uuid: string): Promise<dataSet | null> {
        const data = await this.prisma.dataSet.findFirst({
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
                                
        return data ? dataSet.fromPrisma(data) : null;
    }

    async findByName(channelName: string): Promise<dataSet | null> {
        const data = await this.prisma.dataSet.findFirst({
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
                                
        return data ? dataSet.fromPrisma(data) : null;
    }

    async findAllActive(): Promise<dataSet[]> {
        const data = await this.prisma.dataSet.findMany({
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
                                
        const respuesta = dataSet.fromPrismaList(data);
                                
        return respuesta;
    }

    async save(dataSetdata: dataSet): Promise<dataSet> {
        const data = await this.prisma.dataSet.create({
                                      data: {
                                        channelName: dataSetdata.channelName,
                                        averageViewers: dataSetdata.averageViewers,
                                        hoursWatched: dataSetdata.hoursWatched,
                                        maxViewers: dataSetdata.maxViewers,
                                        minutesStreamed: dataSetdata.minutesStreamed,
                                        followersGained: dataSetdata.followersGained,
                                        totalFollowers: dataSetdata.totalFollowers,
                                        rank: dataSetdata.rank,
                                        fechaRegistro: dataSetdata.fechaRegistro,
                                        channel: {
                                          connect: {
                                            uuid: dataSetdata.channelId,
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
                        
        return dataSet.fromPrisma(data);
    }

    async update(uuid: string, dataSetdata: Partial<dataSet>): Promise<dataSet> {
        const dataUpdate: any = {
                                channelName: dataSetdata.channelName,
                                averageVieweres: dataSetdata.averageViewers,
                                hoursWatched: dataSetdata.hoursWatched,
                                maxViewers: dataSetdata.maxViewers,
                                minutesStreamed: dataSetdata.minutesStreamed,
                                followersGained: dataSetdata.followersGained,
                                totalFollowers: dataSetdata.totalFollowers,
                                rank: dataSetdata.rank,
                                fechaRegistro: dataSetdata.fechaRegistro,
                              };
                        
                              const data = await this.prisma.dataSet.update({
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
        return dataSet.fromPrisma(data);
    }

    async delete(uuid: string): Promise<dataSet> {
        const data = await this.prisma.dataSet.delete({
                                                  where: { uuid },
                                            });
                                            
        return dataSet.fromPrisma(data);
    }

}