import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrganizationService } from 'src/services/organization/organization.service';
import { CreateOrganizationDto } from 'src/dto/organization/create-organization.dto';
import { UpdateOrganizationDto } from 'src/dto/organization/update-organization.dto';
import { User } from 'src/decorators/Index.decorator';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  create(
    @Body() createOrganizationDto: CreateOrganizationDto,
    @User() user: any,
  ) {
    return this.organizationService.create(createOrganizationDto, user);
  }
}
