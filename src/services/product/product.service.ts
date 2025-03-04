import { Injectable } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/product/create-product.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Product } from 'src/entities/product/produtct.entity';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const product = new Product(createProductDto);

    await this.prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        type: product.type,
        orgId: product.orgId,
      },
    });

    return product;
  }

  async getAllProducts() {
    return this.prisma.product.findMany();
  }

  async getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: { id: Number(id) },
    });
  }

  async updateProduct(id: string, updateProductDto: CreateProductDto) {
    return this.prisma.product.update({
      where: { id: Number(id) },
      data: updateProductDto,
    });
  }
}
