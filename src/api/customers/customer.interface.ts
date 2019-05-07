import { Document } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  address: string;
  phone: string;
}