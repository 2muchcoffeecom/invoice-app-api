import { NextFunction } from 'express';

import { HttpError } from './http-error';

export function handleError(
  next: NextFunction,
  message: string = null,
  statusCode: number = 500
) {
  return (err: Error | HttpError) => {
    const isHttpError = err instanceof HttpError;

    const params = isHttpError ?
      err :
      new HttpError(message || err.message, statusCode);

    return next(params);
  }
}
