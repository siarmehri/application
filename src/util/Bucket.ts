import { config } from "../config/config";
import superagent from "superagent";
import AWS from "aws-sdk";

AWS.config.update({ region: config.aws.region });
const credentials = new AWS.SharedIniFileCredentials({
  profile: config.aws.profile,
});
AWS.config.credentials = credentials;
const signedUrlExpireSeconds = 60 * 5;
export class Bucket {
  bucketName: string;
  constructor(bucketName: string) {
    this.bucketName = bucketName;
  }
  GetPutSignedUrl = async (fileFullPath: string, contentType: string, expireInSeconds: number=signedUrlExpireSeconds) => {
    try {
      const s3 = new AWS.S3({
        signatureVersion: "v4",
        region: config.aws.region,
        params: { Bucket: this.bucketName },
      });
      const params = {
        Key: `${fileFullPath}`,
        Expires: expireInSeconds,
        ContentType: `${contentType}`
      };

      const url = await s3.getSignedUrlPromise("putObject", params);
      return Promise.resolve(url);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  UploadFile = async (fileFullPath: string, stream: Buffer, contentType: string=`text/csv`) => {
    try {
      const signedUrl = await this.GetPutSignedUrl(fileFullPath, contentType);
      const response = await superagent
        .put(signedUrl)
        .set("Content-Type", "application/octet-stream")
        .send(stream);
      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  GetObject = async (filePath: string) => {
    try {
      const s3 = new AWS.S3({
        signatureVersion: 'v4',
        region: config.aws.region,
        params: { Bucket: this.bucketName, Key: filePath }
      });
      const data = await s3.getObject().promise();
      return Promise.resolve(data.Body.toString('utf8'));
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export const SwipenS3Bucket = new Bucket(config.aws.swipen_bucket);
