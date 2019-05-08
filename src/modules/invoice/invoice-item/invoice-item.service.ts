import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { validateOrReject } from 'class-validator';

import { CreateInvoiceItem, InvoiceItem, UpdateInvoiceItem } from './invoice-item.interface';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { UpdateInvoiceItemDto } from './dto/update-invoice-item.dto';


@Injectable()
export class InvoiceItemService {
  constructor(
    @InjectModel('InvoiceItem') private readonly invoiceItemModel: Model<InvoiceItem>,
  ) {
  }

  async get(id?: string): Promise<InvoiceItem | InvoiceItem[]> {
    return id ? this.invoiceItemModel.findById(id) : this.invoiceItemModel.find();
  }

  async getByInvoiceId(id?: string): Promise<InvoiceItem[]> {
    return this.invoiceItemModel.find({invoice_id: id});
  }

  async getByProductId(id?: string): Promise<InvoiceItem[]> {
    return this.invoiceItemModel.find({product_id: id});
  }

  async create(invoiceItems: CreateInvoiceItem[]): Promise<InvoiceItem[]> {
    const invoiceItemsDto = await Promise.all(invoiceItems.map(async invoiceItem => {
      const invoiceItemDto = new CreateInvoiceItemDto(invoiceItem);
      await validateOrReject(invoiceItemDto);
      return invoiceItemDto;
    }));
    return this.invoiceItemModel.create(invoiceItemsDto);
  }

  async update(query: UpdateInvoiceItem, invoice: UpdateInvoiceItem): Promise<InvoiceItem> {
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

  async getItemsTotalByInvoice(invoice_id: string) {
    const [result] = await this.invoiceItemModel.aggregate([
      { $match: { invoice_id: Types.ObjectId(invoice_id) } },
      {
        $group: {
          _id: '$invoice_id',
          allQuantities: { $push: '$quantity' },
        },
      },
      {
        $project: {
          total: {
            $reduce: { input: '$allQuantities', initialValue: 0, in: { $sum: ['$$value', '$$this'] } },
          },
        },
      },
    ]);
    return result && result.total || 0;
  }

  addInvoiceIdToItem(invoice_id: string, items: CreateInvoiceItem[]): CreateInvoiceItem[] {
    return items.map((item: CreateInvoiceItemDto) => ({...item, invoice_id}));
  }
}
