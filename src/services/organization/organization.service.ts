import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from '../../dto/organization/create-organization.dto';
import { UpdateOrganizationDto } from '../../dto/organization/update-organization.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  async create(createOrganizationDto: CreateOrganizationDto, user: any) {
    const organization = await this.prisma.organization.create({
      data: createOrganizationDto,
    });

    const UserOrganization = await this.prisma.userOrganization.create({
      data: {
        userId: user.id,
        orgId: organization.id,
      },
    });

    return {
      message: 'Organização criada com sucesso!',
      organization: organization,
    };
  }
}
