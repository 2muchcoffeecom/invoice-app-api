import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { validateOrReject } from 'class-validator';

import { Customer, UpdateCustomer } from './customer.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InvoiceService } from '../invoice/invoice.service';


@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
    private readonly invoiceService: InvoiceService,
  ) {
  }

  async get(id?: string): Promise<Customer | Customer[]> {
    return id ? this.customerModel.findById(id) : this.customerModel.find();
  }

  async findByName(name: string): Promise<Customer> {
    return this.customerModel.findOne({name}).lean();
  }

  async create(customer: CreateCustomerDto): Promise<Customer> {
    const customerDto = new CreateCustomerDto(customer);
    await validateOrReject(customerDto);
    return this.customerModel.create(customerDto);
  }

  async update(query: UpdateCustomer, customer: UpdateCustomerDto): Promise<Customer> {
    const updatedCustomer = query._id ? {_id: query._id, ...customer} : customer;
    const customerDto = new UpdateCustomerDto(updatedCustomer);
    await validateOrReject(customerDto);
    return this.customerModel.findOneAndUpdate(
      query,
      customer,
      {runValidators: true, new: true},
    );
  }

  async delete(id: string): Promise<Customer> {
    const customerInvoices = await this.invoiceService.getByCustomerId(id);
    if (customerInvoices.length) {
      throw new HttpException('Customer has invoices', HttpStatus.BAD_REQUEST);
    }
    return this.customerModel.findByIdAndDelete(id);
  }
}
