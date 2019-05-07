import { Schema, model } from 'mongoose';

import { ICustomer } from './customer.interface';

const customerSchema = new Schema({
  name: { type: String, required: true, unique: true, uniqueCaseInsensitive: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
});

const customer = model<ICustomer>('Customer', customerSchema);

export default customer;