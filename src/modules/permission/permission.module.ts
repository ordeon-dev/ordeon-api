import { Module } from '@nestjs/common';
import { PermissionService } from 'src/hierarchy/permission/permission.service';
import { PermissionController } from 'src/hierarchy/permission/permission.controller';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
