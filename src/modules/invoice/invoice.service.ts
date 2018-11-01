import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { validateOrReject } from 'class-validator';

import { Invoice, UpdateInvoice } from './invoice.interface';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { CustomerService } from '../customer/customer.service';



@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel('Invoice') private readonly invoiceModel: Model<Invoice>,
    private readonly customerService: CustomerService,
  ) {
  }

  async get(id?: string): Promise<Invoice | Invoice[]> {
    return id ? this.invoiceModel.findById(id) : this.invoiceModel.find();
  }

  async create(invoice: Invoice): Promise<Invoice> {
    const invoiceDto = new CreateInvoiceDto(invoice);
    await validateOrReject(invoiceDto);

    return this.invoiceModel.create(invoiceDto);
  }

  async update(query: UpdateInvoice, invoice: UpdateInvoice): Promise<Invoice> {
    const invoiceDto = new UpdateInvoiceDto(invoice);
    await validateOrReject(invoiceDto);

    return this.invoiceModel.findOneAndUpdate(
      query,
      invoice,
      {runValidators: true, new: true},
    );
  }

  async delete(id: string): Promise<Invoice> {
    return this.invoiceModel.findByIdAndDelete(id);
  }
}
