import express, { type Router } from 'express';

import { objecttypesController } from '../../controllers';

const router: Router = express.Router({ mergeParams: true });

router.get('/objecttypes/:type', objecttypesController);

export default router;
