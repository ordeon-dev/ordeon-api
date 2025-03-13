import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/product/create-product.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Product } from 'src/entities/product/produtct.entity';
import { UpdateProductDto } from 'src/dto/product/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllProducts() {
    return this.prisma.product.findMany();
  }

  async getProductById(productId: string) {
    return this.prisma.product.findUnique({
      where: { id: Number(productId) },
    });
  }

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

    const response = {
      message: 'Product created successfully',
      product,
    };
    return response;
  }

  async update(productId: string, updateProductDto: UpdateProductDto) {
    const product = new Product(updateProductDto);

    await this.prisma.product.update({
      where: { id: Number(productId) },
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        type: product.type,
        orgId: product.orgId,
      },
    });

    const response = {
      message: 'Product updated successfully',
      product,
    };
    return response;
  }

  async delete(productId: string) {
    try {
      await this.prisma.orderProduct.deleteMany({
        where: { productId: Number(productId) },
      });

      await this.prisma.product.delete({
        where: { id: Number(productId) },
      });

      const response = {
        message: 'Product deleted successfully',
      };
      return response;
    } catch (error) {
      throw new HttpException(
        `Product not deleted ${error}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
