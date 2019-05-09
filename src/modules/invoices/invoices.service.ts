import { DocumentQuery } from 'mongoose';
import { find as _find, map as _map, reduce as _reduce } from 'lodash';

import { getProductsForInvoice } from '../products/products.service';
import { getInvoiceItemsFromDb } from './invoice-items/invoice-items.service';

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

export async function countInvoiceTotal(invoiceId: string, discount: number): Promise<number> {
  const items = await getInvoiceItemsFromDb(invoiceId);

  const productIds = _map(items, item => item.product_id);

  const products = await getProductsForInvoice(productIds);

  const totalWithoutDiscount = _reduce(items, (total, item) => {
    const product = _find(products, ['_id', item.product_id]);
    const itemTotal = item.quantity * product.price;
    return total + itemTotal;
  }, 0);

  return totalWithoutDiscount * (1 - discount/100);
}