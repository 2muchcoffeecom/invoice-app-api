import { Schema, model } from 'mongoose';

import { IInvoiceItem } from './invoice-item.interface';

const invoiceItemSchema = new Schema(
  {
    invoice_id: {
      type: Schema.Types.ObjectId,
      ref: 'Invoice',
      required: true,
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: { type: Number, min: 0, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const invoiceItem = model<IInvoiceItem>('InvoiceItem', invoiceItemSchema);

export default invoiceItem;
