import { HttpStatus, HttpException, Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateOsDto } from 'src/dto/os/create-os.dto';
import { Os } from 'src/entities/os/os.entity';
import { UpdateOsDto } from 'src/dto/os/update-os.dto';

@Injectable()
export class OsService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany() {
    return this.prisma.order.findMany({
      include: {
        orderVehicle: true,
        orderProduct: true,
      },
    });
  }

  async findOne(orderId: string) {
    return this.prisma.order.findUnique({
      where: { id: Number(orderId) },
      include: {
        orderVehicle: true,
        orderProduct: true,
      },
    });
  }

  async createOs(createOsDto: CreateOsDto) {
    const os = new Os(createOsDto);

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
            show: product.show,
            quantity: product.quantity,
          })),
        },
        orgId: os.orgId,
      },
    });

    const response = {
      message: 'Order created successfully',
      os,
    };
    return response;
  }

  async updateOs(orderId: string, updateOsDto: UpdateOsDto) {
    const os = new Os(updateOsDto);

    await this.prisma.order.update({
      where: { id: Number(orderId) },
      data: {
        clientId: os.clientId,
        statusId: os.statusId,
        orderVehicle: {
          deleteMany: {},
          create: os.orderVehicle.map((vehicle) => ({
            vehicleId: vehicle.vehicleId,
          })),
        },
        orderProduct: {
          deleteMany: {},
          create: os.orderProduct.map((product) => ({
            productId: product.productId,
            show: product.show,
            quantity: product.quantity,
          })),
        },
        orgId: os.orgId,
      },
    });

    const response = {
      message: 'Order updated successfully',
      os,
    };
    return response;
  }

  async deleteOs(orderId: string) {
    try {
      await this.prisma.orderProduct.deleteMany({
        where: { orderId: Number(orderId) },
      });

      await this.prisma.orderVehicle.deleteMany({
        where: { orderId: Number(orderId) },
      });

      await this.prisma.order.delete({
        where: { id: Number(orderId) },
      });

      return 'Order deleted successfully';
    } catch (error) {
      throw new HttpException(
        `Failed to delete order, ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
