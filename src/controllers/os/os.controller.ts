import { Controller, Post, Body, Logger } from '@nestjs/common';
import { OsService } from 'src/services/os/os.service';
import { CreateOsDto } from 'src/dto/os/create-os.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('os')
export class OsController {
  private readonly logger = new Logger(OsController.name);
  constructor(private readonly osService: OsService) {}

  @Public()
  @Post()
  create(@Body() createOsDto: CreateOsDto) {
    return this.osService.createOs(createOsDto);
  }
}
