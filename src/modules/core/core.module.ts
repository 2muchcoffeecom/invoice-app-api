import { Global, Module } from '@nestjs/common';

import { SharedModule } from '../shared/shared.module';
import { ErrorsService } from '../shared/services/errors.service';
import { CustomerService } from '../customer/customer.service';
import { ProductService } from '../product/product.service';


const SERVICES = [
  ErrorsService,
  CustomerService,
  ProductService,
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
