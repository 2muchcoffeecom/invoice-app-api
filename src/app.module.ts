import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';

import * as _ from 'lodash';

import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from './modules/core/core.module';
import { CustomerModule } from './modules/customer/customer.module';
import { ProductModule } from './modules/product/product.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { ConfigService } from './modules/shared/services/config.service';
import { ScalarModule } from './modules/shared/modules/scalar/scalar.module';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get('MONGODB_URI'),
      }),
    }),
    GraphQLModule.forRoot({
      playground: true,
      typePaths: ['./**/*.graphql'],
      context: ({req, res}) => ({req, res}),
      formatError: (err) => {
        console.log('ERROR', err);

        let data: any;
        let message: string;
        let code: string;
        let fields: string;

        try {
          data = JSON.parse(err.message);
        } catch (e) {
          data = err.message;
        }

        if (_.isString(data) || _.isInteger(data)) {
          message = data;
        }
        if (_.isObject(data)) {
          fields = data.fields || undefined;
          code = data.code || undefined;
          message = data.message || undefined;
        }
        return {
          message,
          fields,
          code: err.originalError && err.originalError.code || code,
          locations: err.locations,
          path: err.path,
        };
      },
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
