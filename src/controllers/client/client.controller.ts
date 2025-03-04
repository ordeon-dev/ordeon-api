import { ClientService } from 'src/services/client/client.service';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateClientDto } from 'src/dto/client/create-client.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Public()
  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Public()
  @Get()
  async findAll() {
    return this.clientService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.clientService.findOne(id);
  }
}
