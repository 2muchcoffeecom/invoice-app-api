import { ValidationError } from 'class-validator';
import { HttpStatus } from '@nestjs/common';


export class ParsedError extends Error {
  code;
  data: any;
  constructor(err) {
    if (err instanceof TypeError) {
      super(err.message);
    }
    /**
     * If there is an array of Validation Errors
     */
    else if (ParsedError.isValidationErrors(err)) {
      const data = ParsedError.getValidationErrors(err);
      super(ParsedError.getValidationMessage(data));
      this.data = data;
      this.code = HttpStatus.UNPROCESSABLE_ENTITY;
    }
    /**
     * Bulk operations error handling
     */
    else if (err.name === 'BulkWriteError' && err.code === 11000) {
      super(ParsedError.parseBulkWriteError(err));
      this.code = HttpStatus.UNPROCESSABLE_ENTITY;
    }
    /**
     * Mongo validation error handling
     */
    else if (err.name === 'ValidationError') {
      const data = ParsedError.parseValidationError(err);
      super(data.join(', '));
      this.code = HttpStatus.UNPROCESSABLE_ENTITY;
      this.data = data;
    }
    /**
     * Data base connection error handling
     */
    else if (err.name === 'CastError') {
      super(ParsedError.parseCastError(err));
      this.code = HttpStatus.UNPROCESSABLE_ENTITY;
    }

  }

  static getValidationErrors(errors) {
    return errors.reduce((acc, value) => {
      if (value instanceof ValidationError) {
        if (value.constraints) {
          acc[value.property] = value.constraints;
        }
        if (value.children.length) {
          Object.assign(acc, ParsedError.getValidationErrors(value.children));
        }
      }
      return acc;
    }, {});
  }

  static getValidationMessage(fields: {[field: string]: {[param: string]: string}}) {
    /**
     * Didn't used clear array transforming to avoid several array operations
     */
    return Object.keys(fields)
      .reduce((acc, fieldName) => {
        if (fields[fieldName]) {
          return [...acc, fields[fieldName]];
        }
        return acc;
      }, [])
      .reduce((previousConstraints, constraints) =>
          Object.keys(constraints)
            .reduce((acc, field) => {
              if (constraints.hasOwnProperty(field)) {
                return [ ...acc, constraints[field] ];
              }
              return acc;
            }, previousConstraints)
        , [])
      .join(', ');
  }

  static isValidationErrors(errors: any) {
    if (!(errors instanceof Array)) {
      return false;
    }
    const isValidationErrors = errors.every((singleError) => singleError instanceof ValidationError);
    return isValidationErrors;
  }

  static parseBulkWriteError(error): string {
    const field = error.message.match(/index\:\ (?:.*\.)?\$?(?:([_a-z0-9]*)(?:_\d*)|([_a-z0-9]*))\s*dup key/i);
    let messageField = field[1] || field[2];
    if (messageField === 'url') messageField = 'name';
    return `${messageField} is already exist`;
  }

  static parseValidationError(error): string[] {
    const message: string[] = [];
    for (const field in error.errors) {
      if (error.errors.hasOwnProperty(field)) {
        message.push(error.errors[field].message);
      }
    }
    return message;
  }

  static parseCastError(error) {
    return `${error.path} not found`;
  }
}