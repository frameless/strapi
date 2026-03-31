import express, { type Router } from 'express';

import { previewController } from '../../controllers';

const router: Router = express.Router({ mergeParams: true });

router.get('/preview', previewController);

export default router;
