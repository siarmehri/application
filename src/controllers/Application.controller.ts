import { Request, Response } from 'express';
import { MongoosClass } from '../util/MongoDB';
import { IApplication } from '../interfaces/IApplication';
import { Client } from '../model/Client';
import { sequelize } from '../util/sequelize';
import { Website } from '../model/website';
import { ClientContact } from '../model/ClientContact';
import { Address } from '../model/Address';

export class Application {
  PostApplication = async (req: Request, res: Response) => {
    const application: IApplication = req.body;
    console.log('good job', application);
    if (JSON.stringify(application.error) !== JSON.stringify({})) {
      // await MongoosClass.StoreDraftApplication(application);

      // not completed
      // Shakir
      await sequelize
        .sync()
        .then((client) => {
          Client.create({
            business_name: application.business_type.company_name,
            trading_name: application.business_type.trading_name,
            business_type: application.business_type.business_type,
            company_registration_number:
              application.business_type.company_number,
          });

          console.log('results', client);
        })
        .then((result) => {
          Website.create({
            urls: application.business_details.website,
            client_id: 1,
          });
          console.log('results', result);
        })
        .then((clientContact) => {
          ClientContact.create({
            title: application.business_owner_details[0].title,
            first_name: application.business_owner_details[0].first_name,
          })
          console.log('results', clientContact);
        })

      console.log('yes');
    } else {
      console.log('not yet');

      // Relational DB logic ()
      // Draft application should be deleted from MongoDB
      // Store Extra Data in Mongo
      // completed
      // Ashraf
    }

    return res.send(application);
  };

  GetApplication = async (req: Request, res: Response) => {
    // take client_id from jwt Ashraf ->
    // 1. Mongo DB Draft Application (In this scenario no need to take it from relational db)
    // 2 if nothing in mongo db take full scope of client and rebuild the IApplication Object return that object to FE
    const { id } = req.params;
    const client = await Client.scope('full').findByPk(id);
    return res.send(client);
  };
}

export const ApplicationController: Application = new Application();
