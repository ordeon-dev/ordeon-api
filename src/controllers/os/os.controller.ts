import { Controller, Post, Body, Logger, Get, Param } from '@nestjs/common';
import { OsService } from 'src/services/os/os.service';
import { CreateOsDto } from 'src/dto/os/create-os.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { GetOsByIdDto } from 'src/dto/os/get-os-by-id.dto';

@Controller('os')
export class OsController {
  private readonly logger = new Logger(OsController.name);
  constructor(private readonly osService: OsService) {}

  @Public()
  @Post()
  create(@Body() createOsDto: CreateOsDto) {
    return this.osService.createOs(createOsDto);
  }

  @Public()
  @Get()
  getOS() {
    return this.osService.findMany();
  }

  @Public()
  @Get(':id')
  getOSById(@Param('id') id: string) {
    return this.osService.findOne(id);
  }
}
