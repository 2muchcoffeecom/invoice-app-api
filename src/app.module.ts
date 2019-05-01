import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';

import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from './modules/core/core.module';
import { GqlConfigService } from './modules/core/services/gql-config.service';
import { CustomerModule } from './modules/customer/customer.module';
import { ProductModule } from './modules/product/product.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { ConfigService } from './modules/core/services/config.service';
import { ScalarModule } from './modules/shared/modules/scalar/scalar.module';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get('MONGODB_URI'),
      }),
    }),
    GraphQLModule.forRootAsync({
      inject: [GqlConfigService],
      useExisting: GqlConfigService,
    }),
    SharedModule,
    CoreModule,
    ScalarModule,
    CustomerModule,
    ProductModule,
    InvoiceModule,
  ],
})

export class AppModule {}
