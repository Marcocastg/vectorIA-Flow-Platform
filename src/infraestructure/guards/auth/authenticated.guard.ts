import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // Passport añade la función `isAuthenticated()` a la request automáticamente.
    // Devuelve `true` si hay una sesión válida, de lo contrario `false`.
    return request.isAuthenticated();
  }
}