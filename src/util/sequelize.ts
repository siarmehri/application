import { Sequelize } from 'sequelize-typescript';
import { config } from '../config/config';

const c = config.db;

export const sequelize = new Sequelize({
    username: c.username,
    password: c.password,
    database: c.database,
    host: c.host,
    dialect: 'mysql',
    storage: ':memory:',
    //logging: c.logging,
    pool: {
      max: 10,
      min: 0,
      acquire: 60000,
      idle: 5000,
      evict: 5000
    },
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  });

export const DBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connection has been established successfully.');
    return Promise.resolve(true);
  } catch (err) {
    console.error('Unable to connect to the database:\n', err);
    return Promise.resolve(false);
  }
}