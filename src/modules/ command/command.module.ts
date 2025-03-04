import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { Seeder } from 'src/command/seeder';
import { CommandService } from 'src/services/command/command.service';

@Module({
  providers: [Seeder, CommandService],
  imports: [PrismaModule],
  exports: [CommandService],
})
export class CommandModule {}
