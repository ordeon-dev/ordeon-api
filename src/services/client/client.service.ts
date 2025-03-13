import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateClientDto } from 'src/dto/client/create-client.dto';
import { UpdateClientDto } from 'src/dto/client/update-client.dto';
import { Client } from 'src/entities/client/client.entity';
@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

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
}
