import Bluebird from 'bluebird';
import { NextFunction } from 'express';
import { DocumentQuery } from 'mongoose';

import { IInvoice } from '../invoice.interface';

import { IInvoiceItem } from './invoice-item.interface';
import InvoiceItem from './invoice-item.schema';

import { HttpError } from 'utils/error-hadler/http-error';

export function getInvoiceItemsFromDb(invoiceId: string): DocumentQuery<IInvoiceItem[], IInvoiceItem> {
  return InvoiceItem.find({ invoice_id: invoiceId });
}

export function createInvoiceItemInDb(newInvoiceItem: IInvoiceItem): Promise<IInvoiceItem> {
  const newEntity = new InvoiceItem(newInvoiceItem);
  return newEntity.save();
}

/**
 * Creates invoice items for new invoice
 *
 * @param {string} invoiceId
 * @param {IInvoiceItem[]} newInvoiceItems
 * @returns {Bluebird<IInvoiceItem[]>}
 */
export function createInvoiceItemsInDb(invoiceId: string, newInvoiceItems: IInvoiceItem[]): Bluebird<IInvoiceItem[]> {
  return Bluebird.Promise.map(newInvoiceItems, item => createInvoiceItemInDb({
    ...item,
    invoice_id: invoiceId
  } as IInvoiceItem));
}

export async function getInvoiceItemFromDb(invoiceId: string, id: string): Promise<IInvoiceItem[] | IInvoiceItem> {
  const invoiceItem = await InvoiceItem.find({
    invoice_id: invoiceId,
    ObjectId: id
  });
  if (!invoiceItem) {
    throw new HttpError('Invoice item not found for current invoice', 404);
  }
  return invoiceItem;
}

export async function updateInvoiceItemInDb(
  invoiceId: string,
  id: string,
  newFields: IInvoiceItem,
): Promise<IInvoiceItem> {
  const updatedEntity = await InvoiceItem.findOneAndUpdate(
    { invoice_id: invoiceId, ObjectId: id },
    newFields,
    { new: true }
  );

  if (!updatedEntity) {
    throw new HttpError('Invoice item not found', 404);
  }
  return updatedEntity;
}

export async function deleteInvoiceItemFromDb(invoiceId: string, id: string): Promise<IInvoiceItem> {
  const deletedEntity = await InvoiceItem.findOneAndRemove({
    invoice_id: invoiceId,
    ObjectId: id
  });
  if (!deletedEntity) {
    throw new HttpError('Invoice item not found', 404);
  }
  return deletedEntity;
}

/**
 * Deletes all invoice items for current invoice
 *
 * @param {IInvoice} invoice
 * @param {e.NextFunction} next
 * @returns {Promise<void>}
 */
export async function deleteInvoiceItemsFromDb(invoice: IInvoice, next: NextFunction) {
  await InvoiceItem.deleteMany({ invoice_id: invoice._id });
  return next();
}
