import { Router } from 'express';
import { ApplicationController } from '../controllers/Application.controller';

const router: Router = Router();

router.get('/', ApplicationController.GetParamSendMessage);

router.get('/testing', ApplicationController.TestingGetParamSendMessage);

export const ApplicationRouter: Router = router;
