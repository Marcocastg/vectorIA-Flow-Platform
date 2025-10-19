import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';
import session from 'express-session';
import passport from 'passport';

async function bootstrap() {
  const logger = new Logger('API');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(
    session({
      // Esta clave secreta se usa para firmar la cookie de la sesión.
      // En producción, ¡debe ser una variable de entorno larga y segura!
      secret: envs.sessionSecret, 
      
      // Estas dos opciones son recomendadas para la mayoría de los casos.
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session())

  await app.listen(envs.port);

  logger.log(`api corriendo en el puerto ${envs.port}`);
  logger.log(`api corriendo en la bd ${envs.databaseUrl}`);
}
bootstrap();
