import { Module } from '@nestjs/common';

import { SharedModule } from '../shared/shared.module';
import { ProductController } from './product.controller';
import { ProductResolver } from './product.resolver';


@Module({
  imports: [
    SharedModule,
  ],
  controllers: [
    ProductController,
  ],
  providers: [
    ProductResolver,
  ],
  exports: [],
})

export class ProductModule {
}
