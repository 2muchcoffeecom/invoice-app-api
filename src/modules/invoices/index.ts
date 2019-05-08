import { Router } from 'express';

import invoiceItemsRouts from './invoice-items'

import {
  createInvoice,
  deleteInvoice,
  getInvoice,
  getInvoices,
  updateInvoice
} from './invoices.controller';

const router = Router();

router.get('/', getInvoices);
router.post('/', createInvoice);

const singleInvoiceRouter = Router({ mergeParams: true });

singleInvoiceRouter.get('/', getInvoice);
singleInvoiceRouter.put('/', updateInvoice);
singleInvoiceRouter.delete('/', deleteInvoice);

router.use('/:id', singleInvoiceRouter);

singleInvoiceRouter.use('/items', invoiceItemsRouts);

export default router;