import { Module } from '@nestjs/common';

import { SharedModule } from '../shared/shared.module';
import { CustomerController } from './customer.controller';

@Module({
  imports: [
    SharedModule,
  ],
  controllers: [
    CustomerController,
  ],
  exports: [
  ],
})

export class CustomerModule {
}
