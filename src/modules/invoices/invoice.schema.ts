import { Schema, model } from 'mongoose';

import { deleteInvoiceItemsFromDb } from './invoice-items/invoice-items.service';

import { IInvoice } from './invoice.interface';

const invoiceSchema = new Schema(
  {
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    discount: { type: Number, min: 0, max: 50, required: true },
    total: { type: Number, min: 0, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

invoiceSchema.post('remove', deleteInvoiceItemsFromDb);

const invoice = model<IInvoice>('Invoice', invoiceSchema);

export default invoice;
