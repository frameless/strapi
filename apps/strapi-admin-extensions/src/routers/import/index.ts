import express from 'express';
import multer from 'multer';
import { importController } from '../../controllers';
const upload = multer({ dest: 'tmp/uploads/' });
const router = express.Router({ mergeParams: true });

router.post('/import', upload.single('file'), importController);
export default router;
