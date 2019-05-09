import { NextFunction, Request, Response } from 'express';
import { Promise } from 'bluebird';

import { createInvoiceItemsInDb } from './invoice-items/invoice-items.service';

import {
  countInvoiceTotal,
  createInvoiceInDb,
  deleteInvoiceFromDb,
  getInvoiceFromDb,
  getInvoicesFromDb,
  updateInvoiceInDb,
} from './invoices.service';

export function getInvoices(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  getInvoicesFromDb()
    .then(invoices => {
      res.json(invoices);
    })
    .catch(next);
}

export function createInvoice(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const newInvoice = req.body;

  createInvoiceInDb(newInvoice)
    .then(createdInvoice =>
      // create invoice items for current invoice
      createInvoiceItemsInDb(createdInvoice._id, newInvoice.items).then(() => {
        countInvoiceTotal(createdInvoice._id, createdInvoice.discount).then(total =>
          res.status(201).json({
            // TODO: re-make without the toObject method
            ...createdInvoice.toObject(),
            total
          })
        );
      }),
    )
    .catch(next);
}

export function getInvoice(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const invoiceId = req.params.id;

  getInvoiceFromDb(invoiceId)
    .then(invoice =>
      countInvoiceTotal(invoice._id, invoice.discount).then(total =>
        res.json({
          ...invoice,
          total
        })
      )
    )
    .catch(next);
}

export function updateInvoice(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const invoiceId = req.params.id;
  const newFields = req.body;

  updateInvoiceInDb(invoiceId, newFields)
    .then(updatedInvoice =>
      countInvoiceTotal(updatedInvoice._id, updatedInvoice.discount).then(total =>
        res.json({
          ...updatedInvoice,
          total
        })
      )
    )
    .catch(next);
}

export function deleteInvoice(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const invoiceId = req.params.id;

  deleteInvoiceFromDb(invoiceId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
}
