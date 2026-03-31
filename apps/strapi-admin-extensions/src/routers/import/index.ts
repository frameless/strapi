import express, { type Router, type RequestHandler } from 'express';
import multer from 'multer';

import { importController } from '../../controllers';

const upload = multer({ dest: 'tmp/uploads/' });
const router: Router = express.Router({ mergeParams: true });

router.post('/import', upload.single('file') as unknown as RequestHandler, importController);

export default router;
