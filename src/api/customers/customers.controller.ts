import { Request, Response } from 'express';

import { getCustomerFromDb, getCustomersFromDb } from './customers.service';

export function getCustomers(req: Request, res: Response): void {
  getCustomersFromDb()
  .then((customers) => {
    res.json(customers)
  })
  .catch(() => {
    res.status(500).json({ message: 'An error occurred while processing the request' });
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