import { Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateCustomer, Customer, UpdateCustomer } from './customer.interface';
import { CustomerService } from './customer.service';


@Resolver('Customer')
export class CustomerResolver {
  constructor(
    private readonly customerService: CustomerService,
  ) {
  }

  @Query('customers')
  async getCustomers(obj, args, context, info) {
    return await this.customerService.get();
  }

  @Query('customer')
  async getCustomer(obj, {id}: {id: string}, context, info) {
    return await this.customerService.get(id);
  }

  @Mutation('updateCustomer')
  async updateCustomer(_, {input}: {input: UpdateCustomer}, context): Promise<Customer> {
    return this.customerService.update({_id: input._id}, input);
  }

  @Mutation('createCustomer')
  async createCustomer(_, {input}: {input: CreateCustomer}, context): Promise<Customer> {
    return this.customerService.create(input);
  }

  @Mutation('deleteCustomer')
  async deleteCustomer(_, {input}: {input: string}, context): Promise<Customer> {
    return this.customerService.delete(input);
  }

}