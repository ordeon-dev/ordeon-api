import { Module } from '@nestjs/common';
import { PermissionService } from 'src/services/permission/permission.service';
import { PermissionController } from 'src/controllers/permission/permission.controller';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
