import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';

import * as _ from 'lodash';


@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      typePaths: ['./**/*.graphql'],
      playground: true,
      context: ({req, res}) => ({req, res}),
      formatError: (err) => {
        console.log('ERROR', err);

        let data: any;
        let message: string;
        let code: string;
        let fields: string;

        try {
          data = JSON.parse(err.message);
        } catch (e) {
          data = err.message;
        }

        if (_.isString(data) || _.isInteger(data)) {
          message = data;
        }
        if (_.isObject(data)) {
          fields = data.fields || undefined;
          code = data.code || undefined;
          message = data.message || undefined;
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