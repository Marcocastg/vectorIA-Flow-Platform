import { PrismaService } from "src/core/services/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "src/core/repositories/category/category.repository";
import { Category } from "src/core/entities/category/category.entity";

@Injectable()
export class CategoryPrismaRepository implements CategoryRepository {
    constructor(private prisma: PrismaService) {}

    async findById(uuid: string): Promise<Category | null> {
        const data = await this.prisma.category.findUnique({
                    where: { uuid },
                    include: {
                        platform: {
                            select: {
                                uuid: true,
                                firstName: true,
                                lastName: true,
                                email: true,
                        }
                    },
                }
            });
                
        return data ? Analysis.fromPrisma(data) : null;
    }
    findByName(nombre: string): Promise<Category | null> {
        throw new Error("Method not implemented.");
    }
    findAllActive(): Promise<Category[]> {
        throw new Error("Method not implemented.");
    }
    save(category: Category): Promise<Category> {
        throw new Error("Method not implemented.");
    }
    update(uuid: string, category: Partial<Category>): Promise<Category> {
        throw new Error("Method not implemented.");
    }
    delete(uuid: string): Promise<Category> {
        throw new Error("Method not implemented.");
    }

    

}