import { Request, Response } from 'express';
import { IApplication } from '../interfaces/IApplication';

export class Application {
    PostApplication = async (req: Request, res: Response) => {
        const application: IApplication = req.body;
    }
}
export const ApplicationController: Application = new Application();
