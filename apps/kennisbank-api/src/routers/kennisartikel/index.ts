import express from 'express';
import { kennisartikelController } from '../../controllers';

const router = express.Router({ mergeParams: true });

router.get('/kennisartikel', kennisartikelController);

export default router;
