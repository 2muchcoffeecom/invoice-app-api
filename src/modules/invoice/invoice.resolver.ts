import { Mutation, Query, ResolveProperty, Resolver } from '@nestjs/graphql';

import { CustomerService } from '../customer/customer.service';

import { InvoiceService } from './invoice.service';
import { CreateInvoice, Invoice, UpdateInvoice } from './invoice.interface';

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
  async getInvoice(obj, { id }: { id: string }, context, info) {
    return await this.invoiceService.get(id);
  }

  @Mutation('createInvoice')
  async createInvoice(_, { input }: { input: CreateInvoice }, context): Promise<Invoice> {
    return await this.invoiceService.create(input);
  }

  @Mutation('updateInvoice')
  async updateInvoice(_, { input }: { input: UpdateInvoice }, context): Promise<Invoice> {
    return await this.invoiceService.update({ _id: input._id }, input);
  }

  @Mutation('deleteInvoice')
  async deleteInvoice(_, { input }: { input: string }, context): Promise<Invoice> {
    return await this.invoiceService.delete(input);
  }

  @ResolveProperty('customer')
  async getCustomer({ customer_id }: Invoice, args, context, info) {
    return await this.customerService.get(customer_id);
  }

  @ResolveProperty('items')
  async getItems({ _id }: Invoice, args, context, info) {
    return await this.invoiceItemService.getByInvoiceId(_id);
  }

  @ResolveProperty('total')
  async getTotal({ _id }: Invoice, args, context, info) {
    return this.invoiceItemService.getItemsTotalByInvoice(_id);
  }
}