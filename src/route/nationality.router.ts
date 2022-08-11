import {Router} from 'express';
import {NationalityController} from '../controllers/Nationality.controller';

const router: Router = Router();

router.post('/', NationalityController.PostNationality);
router.get('/:name', NationalityController.GetNationality);
router.get('/', NationalityController.GetNationalities);
router.delete('/', NationalityController.DeleteNationality);

export const NationalityRouter: Router = router;