import express from 'express';
import { openAPIController } from '../../controllers';

const router = express.Router({ mergeParams: true });

router.get('/openapi.json', openAPIController);

export default router;
