import { Module } from '@nestjs/common';

import { SharedModule } from '../shared/shared.module';
import { InvoiceController } from './invoice.controller';
import { InvoiceItemModule } from './invoice-item/invoice-item.module';
import { InvoiceResolver } from './invoice.resolver';


@Module({
  imports: [
    SharedModule,
    InvoiceItemModule,
  ],
  controllers: [
    InvoiceController,
  ],
  providers: [
    InvoiceResolver,
  ],
  exports: [
  ],
})

export class InvoiceModule {
}
