import { DocumentQuery } from 'mongoose';

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
