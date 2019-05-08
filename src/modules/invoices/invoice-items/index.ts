import { Router } from 'express';

import {
  createInvoiceItem,
  deleteInvoiceItem,
  getInvoiceItem,
  getInvoiceItems,
  updateInvoiceItem,
} from './invoice-items.controller';

const router = Router({ mergeParams: true });

router.get('/', getInvoiceItems);
router.post('/', createInvoiceItem);
router.get('/:item_id', getInvoiceItem);
router.put('/:item_id', updateInvoiceItem);
router.delete('/:item_id', deleteInvoiceItem);

export default router;
