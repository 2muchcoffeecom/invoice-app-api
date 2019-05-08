import { Document } from 'mongoose';

export interface IInvoice extends Document {
  customer_id: string;
  discount: number;
  total: number;
}
