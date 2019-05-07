import { HttpException, Injectable, ExecutionContext, CallHandler, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ParsedError } from './parsed-error';


@Injectable()
export class ExceptionInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(error => {
          let resError = error;
          /**
           * Condition to parse error if unhandled before
           */
          if (!(error instanceof ParsedError)) {
            resError = new ParsedError(error);
          }
          return throwError(
            new HttpException(
              resError.message,
              resError.code,
            ),
          );
        }),
      );
  }
}