import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { CommandModule } from './modules/ command/command.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { NotificationGateway } from './gateway/notification/notification.gateway';
import { OrganizationModule } from './modules/organization/organization.module';
import { GroupModule } from './modules/group/group.module';
import { ModuleModule } from './modules/module/module.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RequestContextMiddleware } from './utils/request-context.middleware';
import { ProductModule } from './modules/product/product.module';
import { OsModule } from './modules/os/os.module';

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
    ProductModule,
    OsModule,
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
