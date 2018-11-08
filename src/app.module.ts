import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from './modules/core/core.module';
import { CustomerModule } from './modules/customer/customer.module';
import { ProductModule } from './modules/product/product.module';
import { InvoiceModule } from './modules/invoice/invoice.module';

dotenv.load({path: '.env'});


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    SharedModule,
    CoreModule,
    CustomerModule,
    ProductModule,
    InvoiceModule,
  ],
})

export class AppModule {}
