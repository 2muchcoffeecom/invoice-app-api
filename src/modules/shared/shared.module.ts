import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomerSchema } from '../customer/customer.schema';
import { ProductSchema } from '../product/product.schema';
import { InvoiceSchema } from '../invoice/invoice.schema';
import { InvoiceItemSchema } from '../invoice/invoice-item/invoice-item.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Customer', schema: CustomerSchema},
      {name: 'Product', schema: ProductSchema},
      {name: 'Invoice', schema: InvoiceSchema},
      {name: 'InvoiceItem', schema: InvoiceItemSchema},
    ]),
  ],
  providers: [],
  exports: [
    MongooseModule,
  ],
})

export class SharedModule {
}
