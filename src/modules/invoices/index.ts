import { Router } from 'express';

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
router.get('/:id', getInvoice);
router.put('/:id', updateInvoice);
router.delete('/:id', deleteInvoice);

export default router;