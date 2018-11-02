import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { validateOrReject } from 'class-validator';

import { CustomerService } from '../../customer/customer.service';
import { InvoiceItem, UpdateInvoiceItem } from './invoice-item.interface';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { UpdateInvoiceItemDto } from './dto/update-invoice-item.dto';



@Injectable()
export class InvoiceItemService {
  constructor(
    @InjectModel('InvoiceItem') private readonly invoiceItemModel: Model<InvoiceItem>,
    private readonly customerService: CustomerService,
  ) {
  }

  async get(id?: string): Promise<InvoiceItem | InvoiceItem[]> {
    return id ? this.invoiceItemModel.findById(id) : this.invoiceItemModel.find();
  }

  async getByInvoiceId(id?: string): Promise<InvoiceItem | InvoiceItem[]> {
    return this.invoiceItemModel.find({invoice_id: id});
  }

  async create(invoiceId: string, invoiceItems: CreateInvoiceItemDto[]): Promise<InvoiceItem[]> {
    const invoiceItemsDto = await Promise.all(invoiceItems.map(async invoiceItem => {
      const invoiceItemDto = new CreateInvoiceItemDto({...invoiceItem, invoice_id: invoiceId});
      await validateOrReject(invoiceItemDto);
      return invoiceItemDto;
    }));
    return this.invoiceItemModel.create(invoiceItemsDto);
  }

  async update(query: UpdateInvoiceItem, invoice: UpdateInvoiceItemDto): Promise<InvoiceItem> {
    const invoiceItemDto = new UpdateInvoiceItemDto(invoice);
    await validateOrReject(invoiceItemDto);

    return this.invoiceItemModel.findOneAndUpdate(
      query,
      invoice,
      {runValidators: true, new: true},
    );
  }

  async delete(id: string): Promise<InvoiceItem> {
    return this.invoiceItemModel.findByIdAndDelete(id);
  }
}
