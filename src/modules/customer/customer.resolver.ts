import { Mutation, Query, ResolveProperty, Resolver } from '@nestjs/graphql';

import { Customer } from './customer.interface';
import { CustomerService } from './customer.service';


@Resolver('Customer')
export class CustomerResolver {
  constructor(
    private readonly customerService: CustomerService,
  ) {
  }

  @Query('customers')
  async getUsers(obj, args, context, info) {
    return await this.customerService.get();
  }

  @Query('customer')
  async getUser(obj, args, context, info) {
    const {id} = args;
    return await this.customerService.get(id);
  }

  @Mutation('updateCustomer')
  async updateCustomer(_, {input}, context): Promise<Customer> {


    return this.customerService.update({_id: context.req.user._id}, input);
  }

}