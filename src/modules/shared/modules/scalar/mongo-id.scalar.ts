import { Scalar } from '@nestjs/graphql';
import { Kind } from 'graphql';

@Scalar('MongoId')
export class MongoIdScalar {
  description = 'MongoId custom scalar type';

  parseValue(value) {
    return value;
  }

  serialize(value) {
    return value.toString();
  }

  parseLiteral(ast) {
    return ast.value;
  }
}