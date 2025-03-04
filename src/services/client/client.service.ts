import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateClientDto } from 'src/dto/client/create-client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    await this.prisma.client.create({
      data: {
        name: createClientDto.name,
        cpf_cnpj: createClientDto.cpf_cnpj,
        rg: createClientDto.rg,
        cnh: createClientDto.cnh,
        status: createClientDto.status,
        orgId: createClientDto.orgId,
      },
    });
  }

  async findAll() {
    return this.prisma.client.findMany();
  }

  async findOne(id: number) {
    return this.prisma.client.findUnique({
      where: { id },
    });
  }
}
