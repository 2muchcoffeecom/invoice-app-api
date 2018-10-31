import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from '../customer/customer.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Customer', schema: CustomerSchema },
    ]),
  ],
  providers: [],
  exports: [
    MongooseModule,
  ],
})

export class SharedModule {
}
