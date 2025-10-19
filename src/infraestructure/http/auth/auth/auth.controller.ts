import { Controller, Post, UseGuards, Request, Body, Get, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from 'src/application/dto/login/login.dto';
import { AuthenticatedGuard } from 'src/infraestructure/guards/auth/authenticated.guard';

@Controller('auth')
export class AuthController {

  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    await new Promise<void>((resolve, reject) => {
      req.logIn(req.user, (err) => {
        if (err) {
          console.error('Error explícito en req.logIn:', err);
          return reject(err);
        }
        resolve();
      });
    });
    return req.user; 
  }

  /**
   * Endpoint para verificar si el usuario tiene una sesión activa.
   * Protegido por el AuthenticatedGuard.
   */
  @UseGuards(AuthenticatedGuard)
  @Get('status')
  status(@Request() req) {
    // Si el guard pasa, significa que req.user existe.
    return req.user;
  }

  /**
   * Endpoint para cerrar sesión.
   */
  @Get('logout')
  logout(@Request() req) {
    // Destruye la sesión en el servidor.
    req.session.destroy();
    return { msg: 'La sesión ha sido cerrada' };
  }
}
