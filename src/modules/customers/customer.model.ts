import { Schema, model } from 'mongoose';

import { ICustomer } from './customer.interface';

const customerSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  },
  address: { type: String, trim: true, required: true },
  phone: { type: String, trim: true, required: true },
}, {
  versionKey: false,
  timestamps: true,
});

const customer = model<ICustomer>('Customer', customerSchema);

export default customer;
