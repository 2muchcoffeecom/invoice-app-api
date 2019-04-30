import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { InvoiceItemResolver } from './invoice-item.resolver';

@Module({
  imports: [
    SharedModule,
  ],
  providers: [
    InvoiceItemResolver,
  ],
})

export class InvoiceItemModule {
}
