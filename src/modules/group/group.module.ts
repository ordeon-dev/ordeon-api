import { Module } from '@nestjs/common';
import { GroupService } from 'src/services/group/group.service';
import { GroupController } from 'src/controllers/group/group.controller';
import { ClientModule } from 'src/modules/client/client.module';

@Module({
  controllers: [GroupController],
  providers: [GroupService],
  imports: [ClientModule],
})
export class GroupModule {}
