import { Module } from '@nestjs/common';
import { ProductService } from 'src/services/product/product.service';
import { ProductController } from 'src/controllers/product/product.contoller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
