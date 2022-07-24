import { Router } from 'express';
import { CustomValidator } from '../class/CustomValidator';
import { ApplicationController } from '../controllers/Application.controller';

const router: Router = Router();

router.post('/',
  CustomValidator.IsValidApplicationPostRequest,
  ApplicationController.PostApplication
);

export const ApplicationRouter: Router = router;
