import {
  Controller,
  Post,
  Body,
  Logger,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { OsService } from 'src/services/os/os.service';
import { CreateOsDto } from 'src/dto/os/create-os.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { UpdateOsDto } from 'src/dto/os/update-os.dto';

@Controller('os')
export class OsController {
  private readonly logger = new Logger(OsController.name);
  constructor(private readonly osService: OsService) {}

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

  @Public()
  @Post()
  create(@Body() createOsDto: CreateOsDto) {
    return this.osService.createOs(createOsDto);
  }

  @Public()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateOsDto: UpdateOsDto) {
    return this.osService.updateOs(id, updateOsDto);
  }

  @Public()
  @Delete(':id')
  async deleteOs(@Param('id') orderId: string) {
    await this.osService.deleteOs(orderId);
  }
}
