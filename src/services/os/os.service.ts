import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateOsDto } from 'src/dto/os/create-os.dto';
import { Os } from 'src/entities/os/os.entity';

@Injectable()
export class OsService {
  constructor(private readonly prisma: PrismaService) {}

  async createOs(createOsDto: CreateOsDto) {
    const os = new Os(createOsDto);
    console.log(JSON.stringify(os, null, 2));

    await this.prisma.order.create({
      data: {
        clientId: os.clientId,
        statusId: os.statusId,
        orderVehicle: {
          create: os.orderVehicle.map((vehicle) => ({
            vehicleId: vehicle.vehicleId,
          })),
        },
        orderProduct: {
          create: os.orderProduct.map((product) => ({
            productId: product.productId,
          })),
        },
        orgId: os.orgId,
      },
    });
    return os;
  }
}
