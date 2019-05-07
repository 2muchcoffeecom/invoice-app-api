import { HttpException, Injectable, ExecutionContext, CallHandler, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ParsedError } from './parsed-error';


@Injectable()
export class ParseErrorInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError((error: ParsedError) => {
          let parsedError: Error = error;
          /**
           * Condition to parse before unparsed error.
           * Looking for better solution.
           */
          if (!(error instanceof HttpException) && !(error instanceof ParsedError)) {
            parsedError = new ParsedError(error);
          }
          return throwError(parsedError);
        }),
      );
  }
}
