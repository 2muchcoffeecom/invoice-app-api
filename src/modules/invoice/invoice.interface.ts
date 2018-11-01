import { Document } from 'mongoose';


export interface Invoice extends Document {
  readonly customer_id: string;
  readonly discount: number;
  readonly total: number;
}

export interface UpdateInvoice {
  readonly _id?: string;
  readonly discount?: number;
  readonly total?: number;
}