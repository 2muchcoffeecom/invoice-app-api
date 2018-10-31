import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from 'core';
import { CustomerModule } from './modules/customer/customer.module';
import { ProductModule } from './modules/product/product.module';

dotenv.load({path: '.env'});


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    SharedModule,
    CoreModule,
    CustomerModule,
    ProductModule,
  ],
})

export class AppModule {}
