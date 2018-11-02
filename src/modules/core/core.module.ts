import { Global, Module } from '@nestjs/common';

import { SharedModule } from '../shared/shared.module';
import { ErrorsService } from '../shared/services/errors.service';
import { CustomerService } from '../customer/customer.service';
import { ProductService } from '../product/product.service';
import { InvoiceService } from '../invoice/invoice.service';
import { InvoiceItemService } from '../invoice/invoice-item/invoice-item.service';


const SERVICES = [
  ErrorsService,
  CustomerService,
  ProductService,
  InvoiceService,
  InvoiceItemService,
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
