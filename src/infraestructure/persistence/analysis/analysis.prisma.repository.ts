import { Injectable } from "@nestjs/common";
import { Analysis } from "src/core/entities/analysis/analysis.entity";
import { AnalysisRepository } from "src/core/repositories/analysis/analysis.repository";
import { PrismaService } from "src/core/services/prisma/prisma.service";

@Injectable()
export class AnalysisPrismaRepository implements AnalysisRepository {
    constructor(private prisma : PrismaService){}
    
    async findById(id: string): Promise<Analysis | null> {
        const data = await this.prisma.analysis.findUnique({
                      where: { id },
                      include: {
                        user: {
                          select: {
                            uuid: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                      }
                    },
                    channel: {
                          select:{
                            uuid: true,
                            name: true,
                            lastSeenAt: true,
                          }
                        },
                  }
                });
                
                return data ? Analysis.fromPrisma(data) : null;
    }
    async findByTitle(title: string): Promise<Analysis | null> {
            throw new Error("Method not implemented.");
        }
    async findAllActive(): Promise<Analysis[]> {
            throw new Error("Method not implemented.");
        }
    async save(analysis: Analysis): Promise<Analysis> {
            throw new Error("Method not implemented.");
        }
    async update(id: string, analysis: Partial<Analysis>): Promise<Analysis> {
            throw new Error("Method not implemented.");
        }
    async delete(id: string): Promise<Analysis> {
            throw new Error("Method not implemented.");
        }
    ;

}