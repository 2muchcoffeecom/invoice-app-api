import { NextFunction, Request, Response } from 'express';

import {
  createInvoiceItemInDb,
  deleteInvoiceItemFromDb,
  getInvoiceItemFromDb,
  getInvoiceItemsFromDb,
  updateInvoiceItemInDb,
} from './invoice-items.service';

export function getInvoiceItems(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const invoiceId = req.params.id;

  getInvoiceItemsFromDb(invoiceId)
    .then(invoiceItems => {
      res.json(invoiceItems);
    })
    .catch(next);
}

export function createInvoiceItem(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const invoiceId = req.params.id;
  const newInvoiceItem = {
    invoice_id: invoiceId,
    ...req.body,
  };

  createInvoiceItemInDb(newInvoiceItem)
    .then(newInvoiceItem => {
      res.status(201).json(newInvoiceItem);
    })
    .catch(next);
}

export function getInvoiceItem(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const invoiceId = req.params.id;
  const invoiceItemId = req.params.itemId;

  getInvoiceItemFromDb(invoiceId, invoiceItemId)
    .then(invoiceItem => {
      res.json(invoiceItem);
    })
    .catch(next);
}

export function updateInvoiceItem(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const invoiceId = req.params.id;
  const invoiceItemId = req.params.itemId;
  const newFields = req.body;

  updateInvoiceItemInDb(invoiceId, invoiceItemId, newFields)
    .then(updatedInvoiceItem => {
      res.json(updatedInvoiceItem);
    })
    .catch(next);
}

export function deleteInvoiceItem(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const invoiceId = req.params.id;
  const invoiceItemId = req.params.itemId;

  deleteInvoiceItemFromDb(invoiceId, invoiceItemId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
}
