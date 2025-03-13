import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from 'src/services/product/product.service';
import { CreateProductDto } from 'src/dto/product/create-product.dto';
import { UpdateProductDto } from 'src/dto/product/update-product.dto';
import { Public } from 'src/auth/decorators/public.decorator';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

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

  @Public()
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Public()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Public()
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
