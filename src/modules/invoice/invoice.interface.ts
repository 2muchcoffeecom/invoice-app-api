import { Document } from 'mongoose';


export interface Invoice extends Document {
  readonly customer_id: string;
  readonly discount: number;
}

export interface UpdateInvoice {
  readonly _id?: string;
  readonly customer_id?: string;
  readonly discount?: number;
}

export interface CreateInvoice {
  readonly customer_id?: string;
  readonly discount?: number;
}
