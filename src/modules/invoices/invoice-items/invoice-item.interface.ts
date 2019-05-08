import { Document } from 'mongoose';

export interface IInvoiceItem extends Document {
  invoice_id: string;
  product_id: string;
  quantity: number;
}
