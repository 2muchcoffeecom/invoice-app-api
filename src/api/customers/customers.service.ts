import { DocumentQuery } from "mongoose";
import { ICustomer } from './customer.interface';
import Customer from './customer.model'

export function getCustomersFromDb(): DocumentQuery<ICustomer[], ICustomer> {
  return Customer.find({});
}
