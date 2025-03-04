import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/hierarchy/user/user.service';
import { PrismaModule } from 'prisma/prisma.module';
import { jwtConstants } from './constants';
import { UserModule } from 'src/modules/user/user.module';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '3153600000s' },
      }),
    }),
  ],
  providers: [AuthService, UserService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
