import { Injectable, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';


interface Error {
  status: number;
  message: string | string[];
}

@Injectable()
export class ErrorsService {
  parse(err) {
    console.log('ERROR', err);

    const error: Error = {
      status: err.status || err.statusCode || err.errorNumber,
      message: err.message || err.response,
    };
    if (err instanceof Array) {
      error.message = err.reduce((acc, value) => {
        if (value instanceof ValidationError && value.constraints) {
          for (const field in value.constraints) {
            if (value.constraints.hasOwnProperty(field)) {
              acc.push(value.constraints[field]);
            }
          }
        }
        return acc;
      }, []);
      error.status = HttpStatus.UNPROCESSABLE_ENTITY;
    }
    if (err.name === 'BulkWriteError' && err.code === 11000) {
      const field = err.message.match(/index\:\ (?:.*\.)?\$?(?:([_a-z0-9]*)(?:_\d*)|([_a-z0-9]*))\s*dup key/i);
      let messageField = field[1] || field[2];
      if (messageField === 'url') messageField = 'name';
      error.message = `${messageField} is already exist`;
      error.status = HttpStatus.UNPROCESSABLE_ENTITY;
    }
    if (err.name === 'ValidationError') {
      error.status = HttpStatus.UNPROCESSABLE_ENTITY;
      const message: string[] = [];
      for (const field in err.errors) {
        if (err.errors.hasOwnProperty(field)) {
          message.push(err.errors[field].message);
        }
      }
      error.message = message;
    }
    if (err.name === 'CastError') {
      error.message = `${err.path} not found`;
      error.status = HttpStatus.UNPROCESSABLE_ENTITY;
    }
    return error;
  }
}
