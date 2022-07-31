import { Umzug, SequelizeStorage } from "umzug";
import { sequelize } from "./sequelize";

export const umzug = new Umzug({
  storage: new SequelizeStorage({ sequelize }),
  migrations: [
    {
      // the name of the migration is mandatory
      name: '0000-main-migration-application',
      async up({ context }) {
        console.log("Siar was here");
        await sequelize.sync();
      },
      async down({ context }) {
        console.log('down 0000-main-migration-application');
      }
    }
  ],
  context: sequelize.getQueryInterface(),
  logger: console
});
