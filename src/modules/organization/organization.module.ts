import { Module } from '@nestjs/common';
import { OrganizationService } from 'src/hierarchy/organization/organization.service';
import { OrganizationController } from 'src/hierarchy/organization/organization.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule {}
