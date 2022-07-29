import { Request, Response } from 'express';
import { DraftApplication } from '../util/DraftApplicationCollection';
import { IApplication } from '../interfaces/IApplication';
import { Client } from '../model/Client';
import { sequelize } from '../util/sequelize';
import { Website } from '../model/website';
import { ClientContact } from '../model/ClientContact';
import { Address } from '../model/Address';
import { Transaction } from 'sequelize';
import { IClient } from '../model/Client';

export class Application {
  GetClientFromApplication = (application: IApplication): IClient => {
    return {
      id: application.client_id,
      business_name: application.business_type.company_name,
      trading_name: application.business_type.trading_name,
      business_type: application.business_type.business_type,
      company_registration_number: application.business_type.company_number,
      country: application.business_type.registered_business_country,
    };
  };
  GetWebsiteFromApplication = (application: IApplication): any => {
    return {
      urls: application.business_details.website,
      client_id: application.client_id,
    };
  };
  GetAddressFromApplication = (application: IApplication): any => {
    return {
      address_line_1: application.business_details.address.address_line_1,
      locality: application.business_details.address.locality,
      country: application.business_details.address.country,
      post_code: application.business_details.address.postcode,
      type: application.business_details.address.type,
      premises: application.business_details.address.premises,
      client_id: application.client_id,
    };
  };
  GetClientContactFromApplication = (application: IApplication): any => {
    return (
      application.business_owner_details.forEach((element: any) => {
      return {
        id:element.id,
        title: element.title,
        first_name: element.first_name,
        last_name: element.last_name,
        birth_date: element.birth_date,
        nationality: element.nationality,
        country_of_residence: element.country_of_residence,
        share_holding_percentage: element.share_holding_percentage,
        role: element.job_title,
        place_of_birth: element.place_of_birth,
      };
    })
    )
  };

  StoreApplicationInDB = async (application: IApplication) => {
    try {
      return await sequelize.transaction(async (transaction: Transaction) => {
        const client = await Client.UpdateOrCreate(
          this.GetClientFromApplication(application),
          transaction
        );
        const businessWebsite = await Website.UpdateOrCreate(
          this.GetWebsiteFromApplication(application),
          transaction
        );
        const businessAddress = await Address.UpdateOrCreate(
          this.GetAddressFromApplication(application),
          transaction
        );
        const clientContact = await ClientContact.UpdateOrCreate(
          this.GetClientContactFromApplication(application),
          transaction
        );
      });
    } catch (err) {
      return Promise.reject(err);
    }
  };
  PostApplication = async (req: Request, res: Response) => {
    const application: IApplication = req.body;
    if (
      application.error &&
      JSON.stringify(application.error) !== JSON.stringify({})
    ) {
      // Shakir
      await DraftApplication.StoreDraftApplication(application);
    } else {
      console.log(
        'Ashraf please store this full application in Relational DB & Store ExtraData for this application in MongoDB'
      );
      // Relational DB logic ()
      this.StoreApplicationInDB(application);
      // Store Extra Data in Mongo (Shakir please create a mechanism to store extra data into mongodb)
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
