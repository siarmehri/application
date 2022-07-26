import { Request, Response } from 'express';
import { MongoosClass } from '../util/MongoDB';
import { IApplication } from '../interfaces/IApplication';

export class Application {
    PostApplication = async (req: Request, res: Response) => {
        const application: IApplication = req.body;
        if(JSON.stringify(application.error) !== JSON.stringify({})) {
            await MongoosClass.StoreDraftApplication(application);
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
    }

    GetApplication = async (req: Request, res: Response) => {
        // take client_id from jwt Ashraf -> 
        // 1. Mongo DB Draft Application (In this scenario no need to take it from relational db)
        // 2 if nothing in mongo db take full scope of client and rebuild the IApplication Object return that object to FE

        return res.send();
    }
}
export const ApplicationController: Application = new Application();
