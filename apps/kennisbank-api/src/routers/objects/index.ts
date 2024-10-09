import express from 'express';
import { getAllObjectsController, getObjectByUUIDController } from '../../controllers';

const router = express.Router({ mergeParams: true });

router.get('/objects', getAllObjectsController);
router.get('/objects/:uuid', getObjectByUUIDController);

export default router;
