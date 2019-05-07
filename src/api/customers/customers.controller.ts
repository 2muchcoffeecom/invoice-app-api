import { Request, Response } from 'express';

import { getCustomersFromDb } from './customers.service';

export function getCustomers(req: Request, res: Response): void {
  getCustomersFromDb()
  .then((customers) => {
    res.json(customers)
  })
  .catch(() => {
    res.status(500).send('An error occurred while processing the request');
  });
}