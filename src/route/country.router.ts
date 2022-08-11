import {Router} from 'express';
import {CountryController} from '../controllers/Country.controller';

const router: Router = Router();

router.post('/', CountryController.PostCountry);
router.get('/:name', CountryController.GetCountry);
router.get('/', CountryController.GetCountries);
//router.put('/:name', CountryController.PostCountry);
router.delete('/:name', CountryController.DeleteCountry);

export const CountryRouter: Router = router;