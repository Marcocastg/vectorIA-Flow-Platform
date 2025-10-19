import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/core/services/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Aquí le decimos a passport que el campo de "usuario" será el 'email'.
    // Por defecto, passport-local espera 'username'.
    super({ usernameField: 'email' });
    console.log('--- 🟢 LocalStrategy INSTANCIADA ---');
  }

  /**
   * Passport llamará a este método automáticamente cuando usemos el Guard 'local'.
   * @param email El email que el usuario envió en el body.
   * @param pass La contraseña que el usuario envió en el body.
   * @returns El objeto de usuario si la validación es exitosa.
   */
  async validate(email: string, password: string): Promise<any> {
    // Llama a nuestro AuthService del Core para hacer la validación.
    console.log(`--- 🟡 LocalStrategy VALIDATE ejecutado para: ${email} ---`);
    const user = await this.authService.validateUser(email, password);
    
    // Si el servicio devuelve null, lanzamos una excepción que NestJS convertirá en una respuesta 401 Unauthorized.
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Si todo está bien, Passport adjuntará el 'user' devuelto a la request (request.user).
    const plainUserObject = JSON.parse(JSON.stringify(user));

    return plainUserObject; // Devolvemos el objeto plano
  }
}