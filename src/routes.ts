import { Express, Request, Response } from 'express';

import customersRouts from './modules/customers';
import productsRouts from './modules/products';
import invoicesRouts from './modules/invoices';

export default function(app: Express) {
  app.use('/customers', customersRouts);
  app.use('/products', productsRouts);
  app.use('/invoices', invoicesRouts);

  // All undefined routes should return a 404
  app.route('/*').get((req: Request, res: Response) => {
    res.status(404).send('Page not found');
  });
}
