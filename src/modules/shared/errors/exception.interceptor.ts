import { HttpException, Injectable, ExecutionContext, CallHandler, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorsService } from '../../core/services/errors.service';


@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  constructor(
    private errorsService: ErrorsService,
  ) {
  }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(error => {
          const resError = this.errorsService.parse(error);
          return throwError(
            new HttpException(
              resError.message,
              resError.status,
            ),
          );
        }),
      );
  }
}