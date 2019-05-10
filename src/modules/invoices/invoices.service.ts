import { DocumentQuery, Types } from 'mongoose';

import { IInvoice } from './invoice.interface';
import Invoice from './invoice.schema';
import InvoiceItem from './invoice-items/invoice-item.schema';

import { HttpError } from 'utils/error-hadler/http-error';

export function getInvoicesFromDb(): DocumentQuery<IInvoice[], IInvoice> {
  return Invoice.find({}).lean();
}

export function createInvoiceInDb(newInvoice: IInvoice): Promise<IInvoice> {
  const newEntity = new Invoice(newInvoice);
  return newEntity.save();
}

export async function getInvoiceFromDb(id: string): Promise<IInvoice> {
  const invoice = await Invoice.findById(id).lean();
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
  }).lean();
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

export async function countInvoiceTotal(invoice_id: string, discount: number): Promise<number> {
  const [result] = await InvoiceItem.aggregate([
    { $match: { invoice_id: Types.ObjectId(invoice_id) } },
    {
      $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "products"
      }
    },
    {
      $unwind: '$products'
    },
    {
      $project: {
        invoice_id: 1,
        itemTotal: { $multiply: [ "$quantity", "$products.price" ] }
      }
    },
    {
      $group: {
        _id: '$invoice_id',
        allItemTotals: { $push: '$itemTotal' },
      },
    },
    {
      $project: {
        totalWithoutDiscount: {
          $reduce: { input: '$allItemTotals', initialValue: 0, in: { $sum: ['$$value', '$$this'] } },
        },
      },
    },
    {
      $project: {
        total: {
          $multiply: [ "$totalWithoutDiscount", 1 - discount/100 ]
        }
      }
    },
  ]);

  return result.total;
}