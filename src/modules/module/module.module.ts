import { Module } from '@nestjs/common';
import { ModuleService } from 'src/hierarchy/module/module.service';
import { ModuleController } from 'src/hierarchy/module/module.controller';

@Module({
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}
