import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateClientDto } from 'src/dto/client/create-client.dto';
import { Client } from 'src/entities/client/client.entity';
@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

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

    return client;
  }

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
}
