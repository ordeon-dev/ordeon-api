import { Module } from '@nestjs/common';
import { GroupService } from 'src/hierarchy/group/group.service';
import { GroupController } from 'src/hierarchy/group/group.controller';
import { ClientModule } from 'src/modules/client/client.module';

@Module({
  controllers: [GroupController],
  providers: [GroupService],
  imports: [ClientModule],
})
export class GroupModule {}
