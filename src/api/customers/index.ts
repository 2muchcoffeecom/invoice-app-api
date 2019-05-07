import { Router } from 'express';

import { getCustomer, getCustomers } from './customers.controller';

const router = Router();

router.get('/', getCustomers);
router.get('/:id', getCustomer);

export default router;