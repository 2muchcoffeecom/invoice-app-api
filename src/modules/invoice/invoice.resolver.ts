import { Mutation, Query, ResolveProperty, Resolver } from '@nestjs/graphql';

import { CustomerService } from '../customer/customer.service';

import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice.interface';

import { InvoiceItemService } from './invoice-item/invoice-item.service';


@Resolver('Invoice')
export class InvoiceResolver {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly invoiceItemService: InvoiceItemService,
    private readonly customerService: CustomerService,
  ) {
  }

  @Query('invoices')
  async getInvoices(obj, args, context, info) {
    return await this.invoiceService.get();
  }

  @Query('invoice')
  async getInvoice(obj, args, context, info) {
    const { id } = args;
    return await this.invoiceService.get(id);
  }

  @Mutation('createInvoice')
  async createInvoice(_, { input }, context): Promise<Invoice> {
    return await this.invoiceService.create(input);
  }

  @Mutation('updateInvoice')
  async updateInvoice(_, { input }, context): Promise<Invoice> {
    return await this.invoiceService.update({ _id: input._id }, input);
  }

  @Mutation('deleteInvoice')
  async deleteInvoice(_, { input }, context): Promise<Invoice> {
    return await this.invoiceService.delete(input);
  }

  @ResolveProperty('customer')
  async getCustomer(invoice: Invoice, args, context, info) {
    const { customer_id } = invoice;
    return await this.customerService.get(customer_id);
  }

  @ResolveProperty('items')
  async getItems(invoice: Invoice, args, context, info) {
    const { _id } = invoice;
    return await this.invoiceItemService.getByInvoiceId(_id);
  }
}