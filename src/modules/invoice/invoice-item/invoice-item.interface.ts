import { Document } from 'mongoose';


export interface InvoiceItem extends Document {
  readonly invoice_id: string;
  readonly product_id: string;
  readonly quantity: number;
}

export interface UpdateInvoiceItem {
  readonly _id?: string;
  readonly product_id?: string;
  readonly quantity?: number;
}

export interface CreateInvoiceItem {
  readonly invoice_id?: string;
  readonly product_id?: string;
  readonly quantity?: number;
}