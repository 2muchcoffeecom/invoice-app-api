import { DocumentQuery } from "mongoose";

import { ICustomer } from './customer.interface';
import Customer from './customer.model'

export function getCustomersFromDb(): DocumentQuery<ICustomer[], ICustomer> {
  return Customer.find({});
}

export function createCustomerInDb(newCustomer: ICustomer): Promise<ICustomer> {
  const newEntity = new Customer(newCustomer);
  return newEntity.save();
}

export async function getCustomerFromDb(id: string): Promise<ICustomer> {
  const customer = await Customer.findById(id);
  if (!customer) {
    throw Error('Customer not found');
  }
  return customer;
}

export async function updateCustomerInDb(id: string, newFields: ICustomer): Promise<ICustomer> {
  const updatedEntity = await Customer.findByIdAndUpdate(id, newFields, { new: true });
  if (!updatedEntity) {
    throw Error('Customer not found');
  }
  return updatedEntity;
}
