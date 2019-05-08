import { DocumentQuery } from 'mongoose';

import { IInvoice } from './invoice.interface';
import Invoice from './invoice.schema';

import { HttpError } from 'utils/error-hadler/http-error';

export function getInvoicesFromDb(): DocumentQuery<IInvoice[], IInvoice> {
  return Invoice.find({});
}

export function createInvoiceInDb(newInvoice: IInvoice): Promise<IInvoice> {
  const newEntity = new Invoice(newInvoice);
  return newEntity.save();
}

export async function getInvoiceFromDb(id: string): Promise<IInvoice> {
  const invoice = await Invoice.findById(id);
  if (!invoice) {
    throw new HttpError('Invoice not found', 404);
  }
  return invoice;
}

export async function updateInvoiceInDb(
  id: string,
  newFields: IInvoice,
): Promise<IInvoice> {
  const updatedEntity = await Invoice.findByIdAndUpdate(id, newFields, {
    new: true,
  });
  if (!updatedEntity) {
    throw new HttpError('Invoice not found', 404);
  }
  return updatedEntity;
}

export async function deleteInvoiceFromDb(id: string): Promise<IInvoice> {
  const foundEntity = await Invoice.findById(id);
  if (!foundEntity) {
    throw new HttpError('Invoice not found', 404);
  }
  return foundEntity.remove();
}
