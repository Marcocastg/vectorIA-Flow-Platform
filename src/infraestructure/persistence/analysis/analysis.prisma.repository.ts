import { Injectable } from "@nestjs/common";
import { Analysis } from "src/core/entities/analysis/analysis.entity";
import { AnalysisRepository } from "src/core/repositories/analysis/analysis.repository";
import { PrismaService } from "src/core/services/prisma/prisma.service";

@Injectable()
export class AnalysisPrismaRepository implements AnalysisRepository {
    constructor(private prisma : PrismaService){}
    
    async findById(uuid: string): Promise<Analysis | null> {
        const data = await this.prisma.analysis.findUnique({
                      where: { uuid },
                      include: {
                        user: {
                          select: {
                            uuid: true,
                            firstName: true,
                            lastName: true,
                            password: false,
                            email: true,
                            companyName: false,
                      }
                    },
                    channel: {
                          select:{
                            uuid: true,
                            name: true,
                            followers: false,
                            lastSeenAt: true,
                            description: false,
                          }
                        },
                  }
                });
                
                return data ? Analysis.fromPrisma(data) : null;
    }
    async findByTitle(title: string): Promise<Analysis | null> {
            const data = await this.prisma.analysis.findUnique({
                      where: { title },
                      include: {
                        user: {
                          select: {
                            uuid: true,
                            firstName: true,
                            lastName: true,
                            password: false,
                            email: true,
                            companyName: false,
                      }
                    },
                    channel: {
                          select:{
                            uuid: true,
                            name: true,
                            followers: false,
                            lastSeenAt: true,
                            description: false,
                          }
                        },
                  }
                });
                
                return data ? Analysis.fromPrisma(data) : null;
        }
    async findAllActive(): Promise<Analysis[]> {
            const data = await this.prisma.analysis.findMany({
                      include: {
                        user: {
                          select: {
                            uuid: true,
                            firstName: true,
                            lastName: true,
                            password: false,
                            email: true,
                            companyName: false,
                      }
                    },
                    channel: {
                          select:{
                            uuid: true,
                            name: true,
                            followers: false,
                            lastSeenAt: true,
                            description: false,
                          }
                        },
                  }
                });


            const res = Analysis.fromPrismaList(data);

            return res;
        }
    async save(analysis: Analysis): Promise<Analysis> {
            const data = await this.prisma.analysis.create({
              data: {
                title: analysis.title,
                user: {
                  connect: {
                    uuid: analysis.userId,
                  }
                },
                channel: {
                  connect: {
                    uuid: analysis.channelId,
                  }
                },
              },
              include: {
                        user: {
                          select: {
                            uuid: true,
                            firstName: true,
                            lastName: true,
                            password: false,
                            email: true,
                            companyName: false,
                      }
                    },
                    channel: {
                          select:{
                            uuid: true,
                            name: true,
                            followers: false,
                            lastSeenAt: true,
                            description: false,
                          }
                        },
                }
            });

            return Analysis.fromPrisma(data);
        }
    async update(uuid: string, analysis: Partial<Analysis>): Promise<Analysis> {
      const dataUpdate: any = {
        title: analysis.title,
      };

      if(analysis.userId){
        dataUpdate.user = {
          connect: {
            uuid: analysis.userId
          }
        };
      }

      if(analysis.channelId){
        dataUpdate.channel = {
          connect: {
            uuid: analysis.channelId
          }
        };
      }

      const data = await this.prisma.analysis.update({
                    where: { uuid },
                    data: dataUpdate,
                    include: {
                user: {
                          select: {
                            uuid: true,
                            firstName: true,
                            lastName: true,
                            password: false,
                            email: true,
                            companyName: false,
                      }
                    },
                    channel: {
                          select:{
                            uuid: true,
                            name: true,
                            followers: false,
                            lastSeenAt: true,
                            description: false,
                          }
                        },
              }
                  });
              return Analysis.fromPrisma(data);
        }
    async delete(uuid: string): Promise<Analysis> {
            const data = await this.prisma.analysis.delete({
                          where: { uuid },
                    });
                    
            return Analysis.fromPrisma(data);
        }
    ;

}