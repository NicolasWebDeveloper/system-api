import { Router } from 'express';

import * as systemController from '../controllers/systemController';

const router = Router();

router.get('/cpu', systemController.apiIsReady, systemController.getCPUInfo);
router.get('/memory', systemController.apiIsReady, systemController.getMemoryInfo);
router.get('/disk', systemController.apiIsReady, systemController.getDiskInformation);
router.get('/process', systemController.apiIsReady, systemController.getProcessInformation);
router.get('/network', systemController.apiIsReady, systemController.getNetworkInformation);
router.get('/all', systemController.apiIsReady, systemController.getAllInformations);

export default router;
