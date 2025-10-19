import { User } from "src/core/entities/user/user.entity";

export interface UserRepository {
  findById(uuid: string): Promise<User | null>;
  findByFullName(firstName: string, lastName: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAllActive(): Promise<User[]>;
  save(user: User): Promise<User>;
  update(uuid: string, user: Partial<User>): Promise<User>;
  delete(uuid: string): Promise<User>;
}