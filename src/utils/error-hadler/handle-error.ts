import { NextFunction, Request, Response } from 'express';

import { HttpError } from './http-error';

export function handleError(err: Error | HttpError, req: Request, res: Response, next: NextFunction) {

    const error = {
      message: err.message,
      name: err.name
    };

    return res.status((err as HttpError).statusCode || 500).json(error);
}
