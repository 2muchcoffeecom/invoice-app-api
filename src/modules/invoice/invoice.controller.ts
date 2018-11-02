import { Get, Controller, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';

import { InvoiceService } from './invoice.service';
import { InvoiceItemService } from './invoice-item/invoice-item.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { CreateInvoiceItemDto } from './invoice-item/dto/create-invoice-item.dto';
import { UpdateInvoiceItemDto } from './invoice-item/dto/update-invoice-item.dto';


@ApiUseTags('Invoice')
@Controller('invoices')
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly invoiceItemService: InvoiceItemService,
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
  async create(@Body() invoice: CreateInvoiceDto) {
    return await this.invoiceService.create(invoice);
  }

  @ApiOperation({title: 'Update Invoice'})
  @Put(':id')
  async update(@Param('id') id: string, @Body() invoice: UpdateInvoiceDto) {
    return await this.invoiceService.update({_id: id}, invoice);
  }

  @ApiOperation({title: 'Delete Invoice'})
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.invoiceService.delete(id);
  }

  @ApiOperation({title: 'Get Invoice Item List'})
  @Get(':id/items')
  async getItems(@Param('id') id: string) {
    return await this.invoiceItemService.getByInvoiceId(id);
  }

  @ApiOperation({title: 'Create Invoice Item/Items'})
  @Post(':id/items')
  async createItems(@Param('id') id: string, @Body() invoiceItem: CreateInvoiceItemDto) {
    const invoiceItems: CreateInvoiceItemDto[] = Array.isArray(invoiceItem) ? invoiceItem : [invoiceItem];
    return await this.invoiceItemService.create(id, invoiceItems);
  }

  @ApiOperation({title: 'Get Invoice Item By Id'})
  @Get(':invoice_id/items/:id')
  async getItem(@Param('invoice_id') invoiceId: string, @Param('id') id: string) {
    return await this.invoiceItemService.get(id);
  }

  @ApiOperation({title: 'Update Invoice Item'})
  @Put(':invoice_id/items/:id')
  async updateItem(@Param('invoice_id') invoiceId: string, @Param('id') id: string, @Body() invoiceItem: UpdateInvoiceItemDto) {
    return await this.invoiceItemService.update({_id: id}, invoiceItem);
  }

  @ApiOperation({title: 'Delete Invoice Item'})
  @Delete(':invoice_id/items/:id')
  async deleteItem(@Param('invoice_id') invoiceId: string, @Param('id') id: string) {
    return await this.invoiceItemService.delete(id);
  }
}
