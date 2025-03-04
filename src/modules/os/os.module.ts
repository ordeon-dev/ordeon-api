import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { OsController } from '../../controllers/os/os.controller';
import { OsService } from '../../services/os/os.service';

@Module({
  imports: [PrismaModule],
  controllers: [OsController],
  providers: [OsService],
})
export class OsModule {}
