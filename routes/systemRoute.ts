import { Router } from 'express';

import * as systemController from '../controllers/systemController';

const router = Router();

router.get('/cpu', systemController.getCPUInfo);
router.get('/memory', systemController.getMemoryInfo);

export default router;
