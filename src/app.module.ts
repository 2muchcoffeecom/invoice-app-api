import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from './modules/core/core.module';
import { CustomerModule } from './modules/customer/customer.module';
import { ProductModule } from './modules/product/product.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { ConfigService } from './modules/shared/services/config.service';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get('MONGODB_URI'),
      }),
    }),
    SharedModule,
    CoreModule,
    CustomerModule,
    ProductModule,
    InvoiceModule,
  ],
})

export class AppModule {}
