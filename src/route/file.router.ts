import { Router } from 'express';
import path from 'path';
import { IGetLink } from '../interfaces/IApplication';
import { SwipenS3Bucket } from '../util/Bucket';
import { promises as fs } from "fs";
import { config } from '../config/config';

const Link: IGetLink = {
  for_field: 'company_document',
  file_format: 'pdf'
}

const router: Router = Router();


// In these routes the responsibility of the BE is to create a signed url for FE to be able to upload files to S3 bucket.
router.post('/client-files', async (req, res, next)=> {
  const payload: IGetLink = req.body;
  let filePath = '../../files/14104906_newinc_2022-05-13.pdf';
  filePath = path.join(__dirname, filePath);
  try {
    const data = await fs.readFile(filePath);
    const url = await SwipenS3Bucket.GetPutSignedUrl(`1/${payload.for_field}.${payload.file_format}`, `application/${payload.file_format}`);
    // await SwipenS3Bucket.Upload(url, data); we do not upload files it is responsibility of FE.
    return res.send({url});
  } catch (err) {
    console.log(err);
    return res.status(500).send({message: 'not uploaded'});
  }
});

router.post('/client-contact-files', async (req, res, next)=> {
  const url = await SwipenS3Bucket.GetPutSignedUrl('1/company_document.pdf', 'application/pdf');
  return res.send({url});
});

router.post('/bank-files', async (req, res, next)=> {
  // const url = await SwipenS3Bucket.GetPutSignedUrl('/1/company_document.pdf', 'application/pdf');
  // return res.send({url});
});

export const FileRouter: Router = router;
