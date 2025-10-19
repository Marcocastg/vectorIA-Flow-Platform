import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "src/core/constants/constants";
import { User } from "src/core/entities/user/user.entity";
import * as bcrypt from 'bcrypt';
import type { UserRepository } from "src/core/repositories/user/user.repository";
import { UserPrismaRepository } from "src/infraestructure/persistence/user/user.prisma.repository";

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserPrismaRepository, // <-- Inyecta la clase directamente
  ) {}

  /**
   * Este método es el corazón de la autenticación local.
   * @returns El objeto de usuario si es válido, o null si no lo es.
   */
  async validateUser(email: string, pass: string): Promise<User | null> {
    // 1. Buscamos al usuario por email usando el repositorio
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        // CAMBIO 2: Anulamos la contraseña antes de devolver la instancia del usuario.
        user.password = ""; 
        return user;
      }
    }

    // 4. Si el usuario no existe o la contraseña no coincide, retornamos null
    return null;
  }
}