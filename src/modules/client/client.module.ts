import { Module } from '@nestjs/common';
import { ClientController } from 'src/controllers/client/client.controller';
import { ClientService } from 'src/services/client/client.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [ClientController],
  imports: [PrismaModule],
  providers: [ClientService],
})
export class ClientModule {}
