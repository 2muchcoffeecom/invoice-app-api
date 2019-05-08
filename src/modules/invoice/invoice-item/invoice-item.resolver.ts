import { Mutation, Query, ResolveProperty, Resolver } from '@nestjs/graphql';

import { InvoiceItemService } from './invoice-item.service';
import { ProductService } from '../../product/product.service';
import { CreateInvoiceItem, InvoiceItem, UpdateInvoiceItem } from './invoice-item.interface';
import { CreateInvoice } from '../invoice.interface';


@Resolver('InvoiceItem')
export class InvoiceItemResolver {
  constructor(
    private readonly invoiceItemService: InvoiceItemService,
    private readonly productService: ProductService,
  ) {
  }

  @Query('invoiceItems')
  async getInvoiceItems(obj, args, context, info) {
    return await this.invoiceItemService.get();
  }

  @Query('invoiceItem')
  async getInvoiceItem(obj, { id }: { id: string }, context, info) {
    return await this.invoiceItemService.get(id);
  }

  @Mutation('createInvoiceItems')
  async createInvoiceItems(_, { input }: { input: CreateInvoiceItem[] }, context): Promise<InvoiceItem[]> {
    return await this.invoiceItemService.create(input);
  }

  @Mutation('updateInvoiceItem')
  async updateInvoiceItem(_, { input }: { input: UpdateInvoiceItem }, context): Promise<InvoiceItem> {
    return await this.invoiceItemService.update({ _id: input._id }, input);
  }

  @Mutation('deleteInvoiceItem')
  async deleteInvoiceItem(_, { input }: { input: string }, context): Promise<InvoiceItem> {
    return await this.invoiceItemService.delete(input);
  }

  @ResolveProperty('product')
  async getProduct({ product_id }: InvoiceItem, args, context, info) {
    return await this.productService.get(product_id);
  }
}