import { User } from "src/core/entities/user/user.entity";

export interface UserRepository {
  findById(uuid: string): Promise<User | null>;
  findByName(nombre: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAllActive(): Promise<User[]>;
  save(user: User): Promise<User>;
  update(uuid: string, user: Partial<User>): Promise<User>;
  delete(uuid: string): Promise<User>;
}