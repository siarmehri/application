import { Request, Response } from 'express';

export class Application {
    GetParamSendMessage = async (req: Request, res: Response) => {
        const { age_of_husband, age_of_wife, husband_email }: any = req.query;
        return res.send({
            total_age_of_husband_and_wife: `${this.AddParam(+age_of_husband, +age_of_wife)}`,
            husband_email
        });
    }

    GetParamSendMessagePostValid = async (req: Request, res: Response) => {
        const { age_of_husband, age_of_wife, error_map }: any = req.body;

        console.log(error_map);

        let respond: any = {
            total_age_of_husband_and_wife: `${this.AddParam(+age_of_husband, +age_of_wife)}`
        }

        if (JSON.stringify(error_map) !== JSON.stringify({})) {
            respond.error_map = error_map;
        }

        return res.send(respond);
    }

    AddParam = (a: number, b: number) => {
        return a + b;
    }
}
export const ApplicationController: Application = new Application();
