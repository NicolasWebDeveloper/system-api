import { Router } from 'express';

import * as systemController from '../controllers/systemController';

const router = Router();

router.get('/cpu', systemController.getCPUInfo);
router.get('/memory', systemController.getMemoryInfo);
router.get('/disk', systemController.getDiskInformation);
router.get('/process', systemController.getProcessInformation);
router.get('/network', systemController.getNetworkInformation);

export default router;
