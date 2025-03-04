import { Module } from '@nestjs/common';
import { Seeder } from 'src/command/seeder';
import { CommandService } from 'src/services/command/command.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  providers: [Seeder, CommandService],
  imports: [PrismaModule],
  exports: [CommandService],
})
export class CommandModule {}
