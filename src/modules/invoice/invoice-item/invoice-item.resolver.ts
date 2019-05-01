import { Mutation, Query, ResolveProperty, Resolver } from '@nestjs/graphql';

import { InvoiceItemService } from './invoice-item.service';
import { ProductService } from '../../product/product.service';
import { InvoiceItem } from './invoice-item.interface';


@Resolver('InvoiceItem')
export class InvoiceItemResolver {
  constructor(
    private readonly invoiceItemService: InvoiceItemService,
    private readonly productService: ProductService,
  ) {
  }

  @Query('invoiceItems')
  async getInvoices(obj, args, context, info) {
    return await this.invoiceItemService.get();
  }

  @Query('invoice')
  async getInvoice(obj, args, context, info) {
    const { id } = args;
    return await this.invoiceItemService.get(id);
  }

  @Mutation('createInvoiceItems')
  async createInvoice(_, { input }, context): Promise<InvoiceItem[]> {
    return await this.invoiceItemService.create(input);
  }

  @Mutation('updateInvoiceItem')
  async updateInvoiceItem(_, { input }, context): Promise<InvoiceItem> {
    return await this.invoiceItemService.update({ _id: input._id }, input);
  }

  @Mutation('deleteInvoiceItem')
  async deleteInvoiceItem(_, { input }, context): Promise<InvoiceItem> {
    return await this.invoiceItemService.delete(input);
  }

  @ResolveProperty('product')
  async getProduct(obj, args, context, info) {
    const { product_id } = obj;
    return await this.productService.get(product_id);
  }
}