import { Get, Controller, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';

import { InvoiceService } from './invoice.service';
import { Invoice, UpdateInvoice } from './invoice.interface';


@ApiUseTags('Invoice')
@Controller('invoices')
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
  ) {}

  @ApiOperation({title: 'Get Invoice List'})
  @Get()
  async getAll() {
    return await this.invoiceService.get();
  }

  @ApiOperation({title: 'Get Invoice By Id'})
  @Get(':id')
  async get(@Param('id') id: string) {
    return await this.invoiceService.get(id);
  }

  @ApiOperation({title: 'Create Invoice'})
  @Post()
  async create(@Body() invoice: Invoice) {
    return await this.invoiceService.create(invoice);
  }

  @ApiOperation({title: 'Update Invoice'})
  @Put(':id')
  async update(@Param('id') id: string, @Body() invoice: UpdateInvoice) {
    return await this.invoiceService.update({_id: id}, invoice);
  }

  @ApiOperation({title: 'Delete Invoice'})
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.invoiceService.delete(id);
  }
}
