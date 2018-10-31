import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { validateOrReject } from 'class-validator';

import { Customer, UpdateCustomer } from './customer.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';


@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
  ) {
  }

  async get(id?: string): Promise<Customer | Customer[]> {
    return id ? this.customerModel.findById(id) : this.customerModel.find();
  }

  async findByName(name: string): Promise<Customer> {
    return this.customerModel.findOne({name}).lean();
  }

  async create(customer: Customer): Promise<Customer> {
    const customerDto = new CreateCustomerDto(customer);
    await validateOrReject(customerDto);

    return this.customerModel.create(customerDto);
  }

  async update(query: UpdateCustomer, customer: UpdateCustomer): Promise<Customer> {
    const customerDto = new UpdateCustomerDto(customer);
    await validateOrReject(customerDto);

    return this.customerModel.findOneAndUpdate(
      query,
      customer,
      {runValidators: true, new: true},
    );
  }

  async delete(id: string): Promise<Customer> {
    return this.customerModel.findByIdAndDelete(id);
  }
}
