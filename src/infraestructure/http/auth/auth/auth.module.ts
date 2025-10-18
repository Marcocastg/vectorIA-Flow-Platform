import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../../user/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from 'src/core/services/auth/auth.service';
import { LocalStrategy } from 'src/infraestructure/auth/strategy/local.strategy';
import { SessionSerializer } from 'src/infraestructure/auth/strategy/session.serializer';
import { PrismaModule } from 'src/core/services/prisma/prisma.module';
import { UserPrismaRepository } from 'src/infraestructure/persistence/user/user.prisma.repository';

@Module({
    imports:[
        UserModule,
        PassportModule.register({session: true}),
        PrismaModule,
    ],
    controllers:[
        AuthController,
    ],
    providers:[
        AuthService,
        LocalStrategy,
        SessionSerializer,
        UserPrismaRepository,
    ]
})
export class AuthModule {}
