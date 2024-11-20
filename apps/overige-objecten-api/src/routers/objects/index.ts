import express from 'express';
import {
  createVacController,
  getAllObjectsController,
  getObjectByUUIDController,
  updateVacController,
} from '../../controllers';

const router = express.Router({ mergeParams: true });

router.get('/objects', getAllObjectsController);
router.get('/objects/:uuid', getObjectByUUIDController);
router.post('/objects', createVacController);
router.put('/objects/:uuid', updateVacController);
export default router;
