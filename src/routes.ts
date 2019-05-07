import { Express, Request, Response } from 'express';

import customersRouts from './modules/customers';

export default function(app: Express) {
  app.use('/customers', customersRouts);

  // All undefined routes should return a 404
  app.route('/*').get((req: Request, res: Response) => {
    res.status(404).send('Page not found');
  });
}
