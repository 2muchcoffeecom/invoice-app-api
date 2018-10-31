import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    return response
      .status(exception.getStatus() || HttpStatus.BAD_REQUEST)
      .json({
        message: exception.getResponse() || 'exception filter',
      });
  }
}