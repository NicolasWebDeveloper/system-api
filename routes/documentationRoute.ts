import { Router } from 'express';

import * as documentationController from '../controllers/documentationController';

const router = Router();

router.get('/all', documentationController.getApiDocumentation);

export default router;
