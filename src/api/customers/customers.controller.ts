import { Request, Response } from 'express';

import {
  createCustomerInDb,
  deleteCustomerFromDb,
  getCustomerFromDb,
  getCustomersFromDb,
  updateCustomerInDb
} from './customers.service';

export function getCustomers(req: Request, res: Response): void {
  getCustomersFromDb()
  .then((customers) => {
    res.json(customers)
  })
  .catch(() => {
    res.status(500).json({ message: 'An error occurred while processing the request' });
  });
}

export function createCustomer(req: Request, res: Response): void {
  const newCustomer = req.body;

  createCustomerInDb(newCustomer)
  .then((newCustomer) => {
    res.status(201).json(newCustomer)
  })
  .catch((err) => {
    res.status(500).json({ message: err.message });
  });
}

export function getCustomer(req: Request, res: Response): void {
  const customerId = req.params.id;

  getCustomerFromDb(customerId)
  .then((customer) => {
    res.json(customer)
  })
  .catch((err) => {
    res.status(500).json({ message: err.message });
  });
}

export function updateCustomer(req: Request, res: Response): void {
  const customerId = req.params.id;
  const newFields = req.body;

  updateCustomerInDb(customerId, newFields)
  .then((updatedCustomer) => {
    res.json(updatedCustomer)
  })
  .catch((err) => {
    res.status(500).json({ message: err.message });
  });
}

export function deleteCustomer(req: Request, res: Response): void {
  const customerId = req.params.id;

  deleteCustomerFromDb(customerId)
  .then(() => {
    res.sendStatus(204);
  })
  .catch((err) => {
    res.status(500).json({ message: err.message });
  });
}