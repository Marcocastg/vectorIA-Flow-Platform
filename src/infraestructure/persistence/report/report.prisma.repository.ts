import { Injectable } from "@nestjs/common";
import { Report } from "src/core/entities/report/report.entity";
import { ReportRepository } from "src/core/repositories/report/report.repository";
import { PrismaService } from "src/core/services/prisma/prisma.service";

@Injectable()
export class ReportPrismaRepository implements ReportRepository{
    constructor(private prisma: PrismaService) {}

    async findById(uuid: string): Promise<Report | null> {
        const data = await this.prisma.report.findFirst({
                            where: { uuid },
                            include: {
                                user: {
                                    select: {
                                        uuid: false,
                                        firstName: true,
                                        lastName: true,
                                        email: true,
                                }
                            },
                        }
                    });
                        
        return data ? Report.fromPrisma(data) : null;
    }

    async findByAIText(aiAnalysis: string): Promise<Report | null> {
        const data = await this.prisma.report.findFirst({
                            where: { aiAnalysis },
                            include: {
                                user: {
                                    select: {
                                        uuid: false,
                                        firstName: true,
                                        lastName: true,
                                        email: true,
                                }
                            },
                        }
                    });
                        
        return data ? Report.fromPrisma(data) : null;
    }

    async findAllActive(): Promise<Report[]> {
        const data = await this.prisma.report.findMany({
                            include: {
                                user: {
                                    select: {
                                        uuid: false,
                                        firstName: true,
                                        lastName: true,
                                        email: true,
                                }
                            },
                        }
                    });
                        
        const respuesta = Report.fromPrismaList(data);
                        
        return respuesta;
    }

    async save(report: Report): Promise<Report> {
        const data = await this.prisma.report.create({
                              data: {
                                inputData: report.inputData,
                                predictionData: report.predictionData,
                                channelName: report.channelName,
                                platformName: report.platformName,
                                aiAnalysis: report.aiAnalysis,
                                user: {
                                  connect: {
                                    uuid: report.userId,
                                  }
                                },
                              },
                              include: {
                                        user: {
                                            select: {
                                                uuid: false,
                                                firstName: true,
                                                lastName: true,
                                                email: true,
                                        }
                                    },
                                }
                            });
                
        return Report.fromPrisma(data);
    }

    async update(uuid: string, report: Partial<Report>): Promise<Report> {
        const dataUpdate: any = {
                        inputData: report.inputData,
                        predictionData: report.predictionData,
                        channelName: report.channelName,
                        platformName: report.platformName,
                        aiAnalysis: report.aiAnalysis,
                      };
                
                      if(report.userId){
                        dataUpdate.user = {
                          connect: {
                            uuid: report.userId
                          }
                        };
                      }

                      const data = await this.prisma.report.update({
                                    where: { uuid },
                                    data: dataUpdate,
                                    include: {
                                        user: {
                                            select: {
                                                uuid: false,
                                                firstName: true,
                                                lastName: true,
                                                email: true,
                                        },
                                        },
                                    }
                                  });
        return Report.fromPrisma(data);
    }

    async delete(uuid: string): Promise<Report> {
        const data = await this.prisma.report.delete({
                                          where: { uuid },
                                    });
                                    
        return Report.fromPrisma(data);
    }

}