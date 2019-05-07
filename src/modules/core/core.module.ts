import { Global, Module } from '@nestjs/common';

import { SharedModule } from '../shared/shared.module';
import { ConfigService } from './services/config.service';
import { CustomerService } from '../customer/customer.service';
import { ProductService } from '../product/product.service';
import { InvoiceService } from '../invoice/invoice.service';
import { InvoiceItemService } from '../invoice/invoice-item/invoice-item.service';
import { GqlConfigService } from './services/gql-config.service';


const SERVICES = [
  ConfigService,
  CustomerService,
  ProductService,
  InvoiceService,
  InvoiceItemService,
  GqlConfigService,
];

@Global()
@Module({
  imports: [
    SharedModule,
  ],
  providers: [
    ...SERVICES,
  ],
  exports: [
    ...SERVICES,
  ],
})

export class CoreModule {
}
