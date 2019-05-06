import { Express, Request, Response } from 'express';

export default function(app: Express) {
  // All undefined routes should return a 404
  app.route('/*').get((req: Request, res: Response) => {
    res.status(404).send('Page not found');
  });
}
