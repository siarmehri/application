import { Request, Response } from 'express';
import { MongoosClass } from '../util/MongoDB';
import { IApplication } from '../interfaces/IApplication';

export class Application {
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
    }

    GetApplication = async (req: Request, res: Response) => {
        // take client_id from jwt
        return res.send();
    }
}
export const ApplicationController: Application = new Application();
