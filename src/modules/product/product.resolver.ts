import { Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateProduct, Product, UpdateProduct } from './product.interface';
import { ProductService } from './product.service';


@Resolver('Product')
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
  ) {
  }

  @Query('products')
  async getProducts(obj, args, context, info) {
    return await this.productService.get();
  }

  @Query('product')
  async getProduct(obj, { id }: { id: string }, context, info) {
    return await this.productService.get(id);
  }

  @Mutation('updateProduct')
  async updateProduct(_, { input }: { input: UpdateProduct }, context): Promise<Product> {
    return this.productService.update({ _id: input._id }, input);
  }

  @Mutation('createProduct')
  async createProduct(_, { input }: { input: CreateProduct }, context): Promise<Product> {
    return this.productService.create(input);
  }

  @Mutation('deleteProduct')
  async deleteProduct(_, { input }: { input: string }, context): Promise<Product> {
    return this.productService.delete(input);
  }

}