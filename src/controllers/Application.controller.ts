import { Request, Response } from 'express';

export class Application {
    GetParamSendMessage = async (req: Request, res: Response) => {
        const { age_of_husband, age_of_wife }: any = req.query;
        return res.send({
            total_age_of_husband_and_wife: `${this.AddParam(+age_of_husband, +age_of_wife)}`
        });
    }

    AddParam = (a: number, b: number) => {
        return a + b;
    }
}
export const ApplicationController: Application = new Application();
