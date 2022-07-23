import { Request, Response } from 'express';

export class Application {
    GetParamSendMessage = async (req: Request, res: Response) => {
        const { scope, name }: any = req.query;
        return res.send({
            message: `scope is: ${scope} & name is ${name} & addition is: ${this.AddParam(1, 2)}`
        });
    }

    AddParam = (a: number, b: number) => {
        return a + b;
    }

    TestingGetParamSendMessage = async (req: Request, res: Response) => {
        const { scope }: any = req.query;
        return res.status(404).send({
            message: `scope: ${scope} is not available`
        });
    }
}
export const ApplicationController: Application = new Application();
