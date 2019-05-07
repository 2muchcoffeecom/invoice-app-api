import { Document } from 'mongoose';


export interface Customer extends Document {
  readonly name: string;
  readonly phone: string;
  readonly address: string;
}

export interface UpdateCustomer {
  readonly _id?: string;
  readonly name?: string;
  readonly phone?: string;
  readonly address?: string;
}

export interface CreateCustomer {
  readonly name?: string;
  readonly phone?: string;
  readonly address?: string;
}