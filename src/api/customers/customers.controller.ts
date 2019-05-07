import { NextFunction, Request, Response } from 'express';

import {
  createCustomerInDb,
  deleteCustomerFromDb,
  getCustomerFromDb,
  getCustomersFromDb,
  updateCustomerInDb,
} from './customers.service';

export function getCustomers(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  getCustomersFromDb()
    .then(customers => {
      res.json(customers);
    })
    .catch(next);
}

export function createCustomer(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const newCustomer = req.body;

  createCustomerInDb(newCustomer)
    .then(newCustomer => {
      res.status(201).json(newCustomer);
    })
    .catch(next);
}

export function getCustomer(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const customerId = req.params.id;

  getCustomerFromDb(customerId)
    .then(customer => {
      res.json(customer);
    })
    .catch(next);
}

export function updateCustomer(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const customerId = req.params.id;
  const newFields = req.body;

  updateCustomerInDb(customerId, newFields)
    .then(updatedCustomer => {
      res.json(updatedCustomer);
    })
    .catch(next);
}

export function deleteCustomer(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const customerId = req.params.id;

  deleteCustomerFromDb(customerId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
}
