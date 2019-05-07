import { Router } from 'express';

import { createCustomer, getCustomer, getCustomers } from './customers.controller';

const router = Router();

router.get('/', getCustomers);
router.post('/', createCustomer);
router.get('/:id', getCustomer);

export default router;