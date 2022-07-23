import { Router } from 'express';
import { CustomValidator } from '../class/CustomValidator';
import { ApplicationController } from '../controllers/Application.controller';

const router: Router = Router();

router.get('/',
  CustomValidator.IsValidApplicationRequest,
  ApplicationController.GetParamSendMessage
);

router.post('/valid',
  CustomValidator.IsValidApplicationPostRequestValid,
  ApplicationController.GetParamSendMessagePostValid
);

export const ApplicationRouter: Router = router;
