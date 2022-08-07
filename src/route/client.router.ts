import { Router } from 'express';
import { CustomValidator } from '../class/CustomValidator';
import { ApplicationController } from '../controllers/Application.controller';

import { sequelize } from "../util/sequelize";


const con = sequelize;

const router: Router = Router();

router.get('/:id', ApplicationController.GetApplication);

export const ClientRouter: Router = router;
