import { Router } from 'express';

import { getCustomers } from './customers.controller';

const router = Router();

router.get('/', getCustomers);

export default router;