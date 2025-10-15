import { Injectable } from "@nestjs/common";
import { User } from "src/core/entities/user/user.entity";
import { UserRepository } from "src/core/repositories/user/user.repository";
import { PrismaService } from "src/core/services/prisma/prisma.service";

@Injectable()
export class UserPrismaRepository implements UserRepository{
    constructor(private prisma: PrismaService) {}

    async findById(uuid: string): Promise<User | null> {
        const data = await this.prisma.user.findUnique({
                                            where: { uuid },
                });
                                        
        return data ? User.fromPrisma(data) : null;
    }

    async findByFullName(firstName: string, lastName: string): Promise<User | null> {
        const data = await this.prisma.user.findUnique({
                                            where: { firstName, lastName },
                });
                                        
        return data ? User.fromPrisma(data) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const data = await this.prisma.user.findUnique({
                                            where: { email },
                });
                                        
        return data ? User.fromPrisma(data) : null;
    }

    async findAllActive(): Promise<User[]> {
        const data = await this.prisma.user.findMany({});
                                        
        const respuesta = User.fromPrismaList(data);
                                        
        return respuesta;
    }

    async save(user: User): Promise<User> {
        const data = await this.prisma.user.create({
                                              data: {
                                                firstName: user.firstName,
                                                lastName: user.lastName,
                                                password: user.password,
                                                email: user.email,
                                                companyName: user.companyName,
                                              },
                                            });
                                
        return User.fromPrisma(data);
    }

    async update(uuid: string, user: Partial<User>): Promise<User> {
        const dataUpdate: any = {
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        password: user.password,
                                        email: user.email,
                                        companyName: user.companyName,
                                };
                                
                const data = await this.prisma.user.update({
                                                    where: { uuid },
                                                    data: dataUpdate,
                });
                
        return User.fromPrisma(data);
    }

    async delete(uuid: string): Promise<User> {
        const data = await this.prisma.user.delete({
                                                          where: { uuid },
                                                    });
                                                    
        return User.fromPrisma(data);
    }


}