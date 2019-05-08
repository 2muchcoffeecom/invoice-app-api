import { NextFunction, Request, Response } from 'express';
import { Promise } from 'bluebird';

import { IInvoiceItem } from './invoice-items/invoice-item.interface';
import { createInvoiceItemInDb, createInvoiceItemsInDb } from './invoice-items/invoice-items.service';

import {
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
      res.status(201).json(createdInvoice);
    })
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
  .then(invoice => {
    res.json(invoice);
  })
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
  .then(updatedInvoice => {
    res.json(updatedInvoice);
  })
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
