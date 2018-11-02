import { Module } from '@nestjs/common';

import { SharedModule } from '../shared/shared.module';
import { InvoiceController } from './invoice.controller';
import { InvoiceItemModule } from './invoice-item/invoice-item.module';


@Module({
  imports: [
    SharedModule,
    InvoiceItemModule,
  ],
  controllers: [
    InvoiceController,
  ],
  exports: [
  ],
})

export class InvoiceModule {
}
