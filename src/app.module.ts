import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CommandModule } from './command/command.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { NotificationGateway } from './notification/notification.gateway';
import { OrganizationModule } from './organization/organization.module';
import { GroupModule } from './group/group.module';
import { ModuleModule } from './module/module.module';
import { PermissionModule } from './permission/permission.module';
import { RequestContextMiddleware } from './utils/request-context.middleware';

@Global()
@Module({
  imports: [
    PrismaModule,
    UserModule,
    CommandModule,
    AuthModule,
    JwtModule,
    OrganizationModule,
    GroupModule,
    ModuleModule,
    PermissionModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    NotificationGateway,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
