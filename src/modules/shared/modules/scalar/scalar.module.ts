import { Module } from '@nestjs/common';

import { MongoIdScalar } from './mongo-id.scalar';


@Module({
  providers: [MongoIdScalar],
})
export class ScalarModule {
}