import { Module } from '@nestjs/common';

import { SharedModule } from '../shared/shared.module';
import { CustomerController } from './customer.controller';
import { CustomerResolver } from './customer.resolver';


@Module({
  imports: [
    SharedModule,
  ],
  controllers: [
    CustomerController,
  ],
  providers: [
    CustomerResolver,
  ],
  exports: [],
})

export class CustomerModule {
}
