import { Module } from '@nestjs/common';

import { SharedModule } from '../shared/shared.module';
import { ProductController } from './product.controller';


@Module({
  imports: [
    SharedModule,
  ],
  controllers: [
    ProductController,
  ],
  exports: [
  ],
})

export class ProductModule {
}
