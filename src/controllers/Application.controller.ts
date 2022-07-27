import { Request, Response } from 'express';
import { MongoosClass } from '../util/MongoDB';
import { IApplication } from '../interfaces/IApplication';
import { Client } from '../model/Client';
import { sequelize } from '../util/sequelize';
import { Website } from '../model/website';

export class Application {
<<<<<<< HEAD
  PostApplication = async (req: Request, res: Response) => {
    const application: IApplication = req.body;
    console.log("good job",application);
    if (JSON.stringify(application.error) !== JSON.stringify({})) {
      await MongoosClass.StoreDraftApplication(application);
       
      // not completed
      // Shakir
      console.log("yes");
    } else {
        console.log("not yet");
     await sequelize.sync().then((result) => {
        return Website.create({ urls: application.business_details.website, client_id: 1 });
        console.log("results",result);
      });
      // Relational DB logic ()
      // Draft application should be deleted from MongoDB
      // Store Extra Data in Mongo
      // completed
      // Ashraf
=======
    PostApplication = async (req: Request, res: Response) => {
        const application: IApplication = req.body;
        if(JSON.stringify(application.error) !== JSON.stringify({})) {
            await MongoosClass.StoreDraftApplication();
            // not completed
            // Shakir
        } else {
            // Relational DB logic ()
            // Draft application should be deleted from MongoDB
            // Store Extra Data in Mongo
            // completed
            // Ashraf
        }

        return res.send(application);
>>>>>>> 81f26bd7be3a6eac5e4e8821e16c637fa337a0f1
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
