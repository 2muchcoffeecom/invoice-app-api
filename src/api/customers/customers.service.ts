import { DocumentQuery } from "mongoose";

import { ICustomer } from './customer.interface';
import Customer from './customer.model'

export function getCustomersFromDb(): DocumentQuery<ICustomer[], ICustomer> {
  return Customer.find({});
}

export async function getCustomerFromDb(id: string): Promise<ICustomer>  {
  const customer = await Customer.findById(id);
  if (!customer) {
    throw Error('Customer not found');
  }
  return customer;
}
