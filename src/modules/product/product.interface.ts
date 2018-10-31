import { Document } from 'mongoose';


export interface Product extends Document {
  readonly name: string;
  readonly price: number;
}

export interface UpdateProduct {
  readonly _id?: string;
  readonly name?: string;
  readonly price?: number;
}