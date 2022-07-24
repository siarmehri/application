export const IsProduction = () =>{
  return (process.env.NODE_ENV as string).trim().toLowerCase() === 'production';
}
export const IsTest = () =>{
  return process.env.MODE && process.env.MODE.trim().toLowerCase() === 'test';
}


export const config = {
  db: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    logging: (IsProduction()) ? false : true
  }
}
