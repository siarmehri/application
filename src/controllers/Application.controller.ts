import { Request, Response } from 'express';
import { DraftApplication } from '../util/DraftApplicationCollection';
import { IApplication } from '../interfaces/IApplication';
import { Client } from '../model/Client';
import { sequelize } from '../util/sequelize';
import { Website } from '../model/website';
import { ClientContact } from '../model/ClientContact';
import { Address } from '../model/Address';
import { Transaction } from 'sequelize';
import {appExtraData} from '../util/ApplicationExtraData'
export interface IClient {
  company_name: string,
  trading_name: string
}
export class Application {
    GetClientFromApplication = (application: IApplication): IClient => {
      return {
        company_name: application.business_type.company_name,
        trading_name: application.business_type.trading_name
      };
    }
    StoreApplicationInDB = async (application: IApplication) => {
      try {
        return await sequelize.transaction(async (transaction: Transaction) => {
            const client = await Client.UpdateOrCreate(this.GetClientFromApplication(application), transaction);
            // const clientContact = await ClientContact.UpdateOrCreate();
            // const businessAddress = await Address.UpdateOrCreate();

        });
    } catch (err) {
        return Promise.reject(err);
    }
    }
    PostApplication = async (req: Request, res: Response) => {
        const application: IApplication = req.body;
        if(application.error && JSON.stringify(application.error) !== JSON.stringify({})) {
            // Shakir
            await DraftApplication.StoreDraftApplication(application);
        } else {
            console.log('Ashraf please store this full application in Relational DB & Store ExtraData for this application in MongoDB');
            // Relational DB logic ()
            this.StoreApplicationInDB(application);
            // Store Extra Data in Mongo (Shakir please create a mechanism to store extra data into mongodb)
            appExtraData.storeApplicationExtraData(application.business_details, application);
            // completed
            // Ashraf
        }

        return res.send(application);
    }

    GetApplication = async (req: Request, res: Response) => {
      // take client_id from jwt Ashraf ->
      // 1. Mongo DB Draft Application (In this scenario no need to take it from relational db)
      // 2 if nothing in mongo db take full scope of client and rebuild the IApplication Object return that object to FE
      const { id } = req.params;
      const client = await Client.scope('full').findByPk(id);
      return res.send(client);
    }
}

export const ApplicationController: Application = new Application();
