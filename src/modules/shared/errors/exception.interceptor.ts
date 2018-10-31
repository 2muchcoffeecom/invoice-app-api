import { HttpException, Injectable, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorsService } from '../services/errors.service';


@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  constructor(
     private errorsService: ErrorsService,
  ) {}

  intercept(context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    return stream$.pipe(
      catchError(error => {
        const resError = this.errorsService.parse(error);
        return throwError(
          new HttpException(
            resError.message || resError.response,
            resError.status || resError.statusCode || resError.errorNumber,
          ),
        );
      }),
    );
  }
}