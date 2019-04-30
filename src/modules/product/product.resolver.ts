import { Mutation, Query, Resolver } from '@nestjs/graphql';

import { Product } from './product.interface';
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
  async getProduct(obj, args, context, info) {
    const { id } = args;
    return await this.productService.get(id);
  }

  @Mutation('updateProduct')
  async updateProduct(_, { input }: {input: Product}, context): Promise<Product> {
    return this.productService.update({_id: input._id}, input);
  }

  @Mutation('createProduct')
  async createProduct(_, { input }, context): Promise<Product> {
    return this.productService.create(input);
  }

}