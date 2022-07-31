import { Router } from 'express';
import path from 'path';
import { IBusinessType } from '../interfaces/IApplication';
import { SwipenS3Bucket } from '../util/Bucket';
import { promises as fs } from "fs";
const router: Router = Router();


// In these routes the responsibility of the BE is to create a signed url for FE to be able to upload files to S3 bucket.
/* router.post('/client-files', async (req, res, next) => {
  const payload: IBusinessType = req.body;
  const { client_id } = req.body;
  return res.send({payload, client_id});
  let filePath = '../../files/14104906_newinc_2022-05-13.pdf';
  filePath = path.join(__dirname, filePath);
  try {
    const data = await fs.readFile(filePath);
    const url = await SwipenS3Bucket.GetPutSignedUrl(`1/${payload.fileUploadNeeded.get_link.for_field}.${payload.fileUploadNeeded.get_link.file_format}`, `application/${payload.fileUploadNeeded.get_link.file_format}`);
    // await SwipenS3Bucket.Upload(url, data); we do not upload files it is responsibility of FE.
    return res.send({ url });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'not uploaded' });
  }
}); */


router.post('/client-files', async (req, res, next) => {
  const { business_type } = req.body;
  const payload: IBusinessType = business_type;
  const { client_id } = req.body;
  try {
    const fileStoragePath = `${client_id}/${payload.fileUploadNeeded.for_field}.${payload.fileUploadNeeded.file_format}`;
    const url = await SwipenS3Bucket.GetPutSignedUrl(fileStoragePath,
      `application/${payload.fileUploadNeeded.file_format}`);
    payload.fileUploadNeeded.url = url;
    payload.fileUploadNeeded.path = fileStoragePath;
    switch (payload.fileUploadNeeded.for_field) {
      case 'bank_document':
        payload.bank_document = payload.fileUploadNeeded;
        break;
      case 'company_document':
        payload.company_document = payload.fileUploadNeeded;
        break;
      case 'certificate_of_incorporation':
        payload.certificate_of_incorporation = payload.fileUploadNeeded;
        break;
    }
    // await SwipenS3Bucket.Upload(url, data); we do not upload files it is responsibility of FE.
    return res.send(payload);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'not uploaded' });
  }
});

router.post('/client-contact-files', async (req, res, next) => {
  const url = await SwipenS3Bucket.GetPutSignedUrl('1/company_document.pdf', 'application/pdf');
  return res.send({ url });
});

router.post('/bank-files', async (req, res, next) => {
  // const url = await SwipenS3Bucket.GetPutSignedUrl('/1/company_document.pdf', 'application/pdf');
  // return res.send({url});
});

export const FileRouter: Router = router;
