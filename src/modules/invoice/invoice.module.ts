import { Module } from '@nestjs/common';

import { SharedModule } from '../shared/shared.module';
import { InvoiceController } from './invoice.controller';

@Module({
  imports: [
    SharedModule,
  ],
  controllers: [
    InvoiceController,
  ],
  exports: [
  ],
})

export class InvoiceModule {
}
