import express from 'express';
import { previewController } from '../../controllers';

const router = express.Router({ mergeParams: true });

router.get('/preview', previewController);

export default router;
