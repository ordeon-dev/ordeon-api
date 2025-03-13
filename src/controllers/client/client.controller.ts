import { ClientService } from 'src/services/client/client.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateClientDto } from 'src/dto/client/create-client.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { UpdateClientDto } from 'src/dto/client/update-client.dto';

@Controller('client')
export class ClientController {
  private readonly logger = new Logger(ClientController.name);
  constructor(private readonly clientService: ClientService) {}

  @Public()
  @Get()
  async findAll() {
    return this.clientService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @Public()
  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    try {
      const client = await this.clientService.create(createClientDto);
      return client;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Public()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return await this.clientService.update(id, updateClientDto);
  }

  @Public()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.clientService.delete(id);
  }
}
