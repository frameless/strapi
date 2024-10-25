import express from 'express';
import { objecttypesController } from '../../controllers';

const router = express.Router({ mergeParams: true });

router.get('/objecttypes/:type', objecttypesController);

export default router;
