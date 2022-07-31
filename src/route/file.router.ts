import { Router } from 'express';
import { IGetLink } from '../interfaces/IApplication';
import { SwipenS3Bucket } from '../util/Bucket';

const Link: IGetLink = {
  for_field: 'company_document',
  file_format: 'pdf'
}

const router: Router = Router();

router.get('/', async (req, res, next)=> {
  const url = await SwipenS3Bucket.GetPutSignedUrl('/1/company_document.pdf', 'application/pdf');
  return res.send({url});
});

export const FileRouter: Router = router;
