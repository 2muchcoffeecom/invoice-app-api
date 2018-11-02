import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [
    SharedModule,
  ],
  controllers: [
  ],
  exports: [
  ],
})

export class InvoiceItemModule {
}
