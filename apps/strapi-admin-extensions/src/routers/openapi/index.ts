import express, { type Router } from 'express';

import { openAPIController } from '../../controllers';

const router: Router = express.Router({ mergeParams: true });

router.get('/openapi.json', openAPIController);

export default router;
