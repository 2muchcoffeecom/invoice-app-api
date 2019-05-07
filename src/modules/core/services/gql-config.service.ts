import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';

import * as _ from 'lodash';

import { ParsedError } from '../../shared/errors/parsed-error';


@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      typePaths: ['./**/*.graphql'],
      playground: true,
      context: ({req, res}) => ({req, res}),
      formatError: (err) => {
        console.log('ERROR', err);

        let message: string;
        let code: string;
        let fields: string;

        if (_.isString(err.message) || _.isInteger(err.message)) {
          message = err.message;
        }
        if (err.originalError && err.originalError instanceof ParsedError) {
          const classError = err.originalError;
          fields = classError.data || undefined;
          message = classError.message || undefined;
          code = classError.code || undefined;
        }
        return {
          message,
          fields,
          code: err.originalError && (err.originalError as any).code || code,
          locations: err.locations,
          path: err.path,
        };
      },
    };
  }
}