import { Get, Controller, Post, Body, Param, Put, Delete, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';

import { ExceptionInterceptor } from '../shared/errors/exception.interceptor';

import { ProductService } from './product.service';
import { CreateProduct, Product, UpdateProduct } from './product.interface';


@ApiUseTags('Product')
@UseInterceptors(ExceptionInterceptor)
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {
  }

  @ApiOperation({title: 'Get Product List'})
  @Get()
  async getAll() {
    return await this.productService.get();
  }

  @ApiOperation({title: 'Get Product By Id'})
  @Get(':id')
  async get(@Param('id') id: string) {
    return await this.productService.get(id);
  }

  @ApiOperation({title: 'Create Product'})
  @Post()
  async create(@Body() product: CreateProduct) {
    return await this.productService.create(product);
  }

  @ApiOperation({title: 'Update Product'})
  @Put(':id')
  async update(@Param('id') id: string, @Body() product: UpdateProduct) {
    return await this.productService.update({_id: id}, product);
  }

  @ApiOperation({title: 'Delete Product'})
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.productService.delete(id);
  }
}
