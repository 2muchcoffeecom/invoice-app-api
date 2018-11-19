import { Get, Controller, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';

import { CustomerService } from './customer.service';
import { Customer } from './customer.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';


@ApiUseTags('Customer')
@Controller('customers')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
  ) {
  }

  @ApiOperation({title: 'Get Customer List'})
  @Get()
  async getAll() {
    return await this.customerService.get();
  }

  @ApiOperation({title: 'Get Customer By Id'})
  @Get(':id')
  async get(@Param('id') id: string) {
    return await this.customerService.get(id);
  }

  @ApiOperation({title: 'Create Customer'})
  @Post()
  async create(@Body() customer: CreateCustomerDto) {
    return await this.customerService.create(customer);
  }

  @ApiOperation({title: 'Update Customer'})
  @Put(':id')
  async update(@Param('id') id: string, @Body() customer: UpdateCustomerDto) {
    return await this.customerService.update({_id: id}, customer);
  }

  @ApiOperation({title: 'Delete Customer'})
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.customerService.delete(id);
  }
}
