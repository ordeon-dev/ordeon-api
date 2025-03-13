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
import { CreateVehicleDto } from 'src/dto/vehicle/create-vehicle.dto';
import { UpdateVehicleDto } from 'src/dto/vehicle/update-vehicle.dto';

@Controller('client')
export class ClientController {
  private readonly logger = new Logger(ClientController.name);
  constructor(private readonly clientService: ClientService) {}

  /**
   * client endpoints
   */

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

  /**
   * client vehicle endpoints
   */
  @Public()
  @Get(':id/vehicles')
  async findVehicles(@Param('id') id: string) {
    return await this.clientService.getClientVehicle(id);
  }

  @Public()
  @Get(':id/vehicles/:vehicleId')
  async findOneVehicle(
    @Param('id') id: string,
    @Param('vehicleId') vehicleId: string,
  ) {
    return await this.clientService.getVehicleById(id, vehicleId);
  }

  @Public()
  @Post(':id/vehicles')
  async createVehicle(
    @Param('id') id: string,
    @Body() createVehicleDto: CreateVehicleDto,
  ) {
    return await this.clientService.createClientVehicle(id, createVehicleDto);
  }

  @Public()
  @Put(':id/vehicles/:vehicleId')
  async updateVehicle(
    @Param('id') id: string,
    @Param('vehicleId') vehicleId: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return await this.clientService.updateClientVehicle(
      id,
      vehicleId,
      updateVehicleDto,
    );
  }

  @Public()
  @Delete(':id/vehicles/:vehicleId')
  async removeVehicle(
    @Param('id') id: string,
    @Param('vehicleId') vehicleId: string,
  ) {
    return await this.clientService.deleteClientVehicle(id, vehicleId);
  }
}
