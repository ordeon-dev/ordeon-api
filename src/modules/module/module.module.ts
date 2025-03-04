import { Module } from '@nestjs/common';
import { ModuleService } from 'src/services/module/module.service';
import { ModuleController } from 'src/controllers/module/module.controller';

@Module({
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}
