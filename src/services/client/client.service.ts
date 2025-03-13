import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateClientDto } from 'src/dto/client/create-client.dto';
import { UpdateClientDto } from 'src/dto/client/update-client.dto';
import { CreateVehicleDto } from 'src/dto/vehicle/create-vehicle.dto';
import { UpdateVehicleDto } from 'src/dto/vehicle/update-vehicle.dto';
import { CreateContactDto } from 'src/dto/contact/create-contact.dto';
import { UpdateContactDto } from 'src/dto/contact/update-contact.dto';

import {
  Client,
  ClientContact,
  ClientVehicle,
} from 'src/entities/client/client.entity';
@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  /*
   * client
   */

  async findAll() {
    return this.prisma.client.findMany();
  }

  async findOne(clientId: string) {
    return this.prisma.client.findUnique({
      where: { id: Number(clientId) },
      include: {
        clientVehicle: true,
        organization: true,
      },
    });
  }

  async create(createClientDto: CreateClientDto) {
    const client = new Client(createClientDto);
    await this.prisma.client.create({
      data: {
        name: client.name,
        cpf_cnpj: client.cpf_cnpj,
        rg: client.rg,
        cnh: client.cnh,
        status: client.status,
        orgId: client.orgId,
      },
    });

    const response = {
      message: 'Client created successfully',
      client,
    };
    return response;
  }

  async update(clientId: string, updateClientDto: UpdateClientDto) {
    const client = new Client(updateClientDto);
    await this.prisma.client.update({
      where: { id: Number(clientId) },
      data: {
        name: client.name,
        cpf_cnpj: client.cpf_cnpj,
        rg: client.rg,
        cnh: client.cnh,
        status: client.status,
        orgId: client.orgId,
      },
    });

    const response = {
      message: 'Client updated successfully',
      client,
    };
    return response;
  }

  async delete(clientId: string) {
    try {
      await this.prisma.clientVehicle.deleteMany({
        where: { clientId: Number(clientId) },
      });

      await this.prisma.client.delete({
        where: { id: Number(clientId) },
      });

      const response = {
        message: 'Client deleted successfully',
      };
      return response;
    } catch (error) {
      throw new HttpException(
        `Error deleting client ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /*
   * client contact
   */

  async getClientContact(clientId: string) {
    const clientContact = await this.prisma.contact.findMany({
      where: { clientId: Number(clientId) },
    });

    const response = {
      message: 'Client contact retrieved successfully',
      clientContact,
    };
    return response;
  }

  async getClientContactById(clientId: string, contactId: string) {
    const clientContact = await this.prisma.contact.findUnique({
      where: { id: Number(contactId), clientId: Number(clientId) },
    });

    const response = {
      message: 'Client contact retrieved successfully',
      clientContact,
    };
    return response;
  }

  async createClientContact(
    clientId: string,
    createContactDto: CreateContactDto,
  ) {
    const clientContact = new ClientContact(createContactDto);
    await this.prisma.contact.create({
      data: {
        clientId: Number(clientId),
        contactName: clientContact.contactName,
        phone: clientContact.phone.map((phone) => phone),
        email: clientContact.email,
      },
    });

    const response = {
      message: 'Client contact created successfully',
      clientContact,
    };
    return response;
  }

  async updateClientContact(
    clientId: string,
    contactId: string,
    updateContactDto: UpdateContactDto,
  ) {
    const clientContact = new ClientContact(updateContactDto);
    await this.prisma.contact.update({
      where: { id: Number(contactId), clientId: Number(clientId) },
      data: {
        contactName: clientContact.contactName,
        phone: clientContact.phone.map((phone) => phone),
        email: clientContact.email,
      },
    });

    const response = {
      message: 'Client contact updated successfully',
      clientContact,
    };
    return response;
  }

  async deleteClientContact(clientId: string, contactId: string) {
    await this.prisma.contact.delete({
      where: { id: Number(contactId), clientId: Number(clientId) },
    });

    const response = {
      message: 'Client contact deleted successfully',
    };
    return response;
  }

  /*
   * client vehicle
   */
  async getClientVehicle(clientId: string) {
    const clientVehicle = await this.prisma.clientVehicle.findMany({
      where: { clientId: Number(clientId) },
    });

    const response = {
      message: 'Client vehicle retrieved successfully',
      clientVehicle,
    };
    return response;
  }

  async getVehicleById(clientId: string, vehicleId: string) {
    const vehicle = await this.prisma.clientVehicle.findUnique({
      where: { id: Number(vehicleId), clientId: Number(clientId) },
    });

    const response = {
      message: 'Vehicle retrieved successfully',
      vehicle,
    };
    return response;
  }

  async createClientVehicle(
    clientId: string,
    createVehicleDto: CreateVehicleDto,
  ) {
    const clientVehicle = new ClientVehicle(createVehicleDto);

    await this.prisma.clientVehicle.create({
      data: {
        clientId: Number(clientId),
        name: clientVehicle.name,
        plate: clientVehicle.plate,
        document: clientVehicle.document,
      },
    });

    const response = {
      message: 'Client vehicle created successfully',
      clientVehicle,
    };
    return response;
  }

  async updateClientVehicle(
    clientId: string,
    vehicleId: string,
    updateVehicleDto: UpdateVehicleDto,
  ) {
    const clientVehicle = await this.prisma.clientVehicle.update({
      where: { id: Number(vehicleId), clientId: Number(clientId) },
      data: {
        name: updateVehicleDto.name,
        plate: updateVehicleDto.plate,
        document: updateVehicleDto.document,
      },
    });

    const response = {
      message: 'Client vehicle updated successfully',
      clientVehicle,
    };
    return response;
  }

  async deleteClientVehicle(clientId: string, vehicleId: string) {
    try {
      await this.prisma.orderVehicle.deleteMany({
        where: { vehicleId: Number(vehicleId) },
      });

      await this.prisma.clientVehicle.delete({
        where: { id: Number(vehicleId), clientId: Number(clientId) },
      });

      const response = {
        message: 'Client vehicle deleted successfully',
      };
      return response;
    } catch (error) {
      throw new HttpException(
        `Error deleting client vehicle ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
