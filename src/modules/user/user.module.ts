import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'prisma/prisma.module';
import { UserController } from '../../hierarchy/user/user.controller';
import { UserService } from '../../hierarchy/user/user.service';
import { jwtConstants } from '../../auth/constants';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '3153600000s' },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtService, AuthGuard, AuthService],
  exports: [UserService],
})
export class UserModule {}
