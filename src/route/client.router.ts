import { Router } from 'express';
import { CustomValidator } from '../class/CustomValidator';
import { ApplicationController } from '../controllers/Application.controller';
import { ClientController} from '../controllers/Client.controller';
import { sequelize } from "../util/sequelize";

const con = sequelize;

const router: Router = Router();

router.get('/',ClientController.getAll,(req,resp)=>{
resp.send("weldone")
});

export const ClienRouter: Router = router;
