import { Router } from 'express';

import { createCustomer, getCustomer, getCustomers, updateCustomer } from './customers.controller';

const router = Router();

router.get('/', getCustomers);
router.post('/', createCustomer);
router.get('/:id', getCustomer);
router.put('/:id', updateCustomer);

export default router;