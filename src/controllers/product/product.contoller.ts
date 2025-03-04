import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProductService } from 'src/services/product/product.service';
import { CreateProductDto } from 'src/dto/product/create-product.dto';
import { Public } from 'src/auth/decorators/public.decorator';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Public()
  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Public()
  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }
}
