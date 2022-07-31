// export const IsProduction = () =>{
//   return (process.env.NODE_ENV as string).trim().toLowerCase() === 'production';
// }
// export const IsTest = () =>{
//   return process.env.MODE && process.env.MODE.trim().toLowerCase() === 'test';
// }


export const config = {
  db: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    //logging: (IsProduction()) ? false : true
  },
  aws: {
    profile: process.env.AWS_PROFILE,
    region: process.env.AWS_REGION,
    api_version: process.env.AWS_API_VERSION,
    swipen_bucket: process.env.AWS_SWIPEN_BUCKET
  }
}
