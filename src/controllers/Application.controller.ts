import { Request, Response } from 'express';
import { DraftApplication } from '../util/DraftApplicationCollection';
import { IAddress, IApplication, IBusinessOwnerDetails } from '../interfaces/IApplication';
import { Client } from '../model/Client';
import { sequelize } from '../util/sequelize';
import { Website } from '../model/website';
import { ClientContact } from '../model/ClientContact';
import { Address } from '../model/Address';
import { Transaction } from 'sequelize';
import { IClient } from '../model/Client';
import { ClientAddress } from '../model/ClientAddress';

export class Application {
  GetClientFromApplication = (application: IApplication): IClient => {
    return {
      id: application.client_id,
      business_name: application.business_type.company_name,
      trading_name: application.business_type.trading_name,
      business_type: application.business_type.business_type,
      company_registration_number: application.business_type.company_number,
      country: application.business_type.registered_business_country,
      vat_number: application.business_type.vat_number,
      date_of_incorporation: application.business_type.date_of_incorporation
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
  GetClientContactFromBusinessOwnerDetails = (businessOwnerDetail: IBusinessOwnerDetails): any => {
    return {
      id: businessOwnerDetail?.id,
      title: businessOwnerDetail.title,
      first_name: businessOwnerDetail.first_name,
      last_name: businessOwnerDetail.last_name,
      birth_date: businessOwnerDetail.date_of_birth,
      nationality: businessOwnerDetail.nationality,
      country_of_residence: businessOwnerDetail.country_of_residence,
      share_holding_percentage: businessOwnerDetail.ownership_percentage,
      role: businessOwnerDetail.job_title,
      place_of_birth: businessOwnerDetail.place_of_birth
    };
  };

  /*  return {
        id: element?.id,
        title: element.title,
        first_name: element.first_name,
        last_name: element.last_name,
        birth_date: element.date_of_birth,
        nationality: element.nationality,
        country_of_residence: element.country_of_residence,
        share_holding_percentage: element.ownership_percentage,
        role: element.job_title,
        place_of_birth: element.place_of_birth,
      }; */

  StoreApplicationInDB = async (application: IApplication) => {
    try {
      return await sequelize.transaction(async (transaction: Transaction) => {
        // Storing Business as a Client in our client table
        const client = await Client.UpdateOrCreate(
          this.GetClientFromApplication(application),
          transaction
        );

        const clientAddress = await ClientAddress.FindOne(client.id, transaction);

        // Address for the client which is a business address
        if(clientAddress instanceof ClientAddress) {
          application.business_details.address.id = clientAddress.address_id;
          await Address.UpdateOrCreate(
            this.GetAddress(application.business_details.address, 'secondary', false),
            transaction
          );
        } else {
          const address = await Address.UpdateOrCreate(
            this.GetAddress(application.business_details.address, 'secondary', false),
            transaction
          );
          await ClientAddress.CreateOrReturn(client.id, address.id, transaction);
        }


        return Promise.resolve({message: 'ok'});


        /* const businessWebsite = await Website.UpdateOrCreate(
          this.GetWebsiteFromApplication(application),
          transaction
        );
        const businessAddress = await Address.UpdateOrCreate(
          this.GetAddressFromApplication(application),
          transaction
        );

        application.business_owner_details.forEach( async (element: IBusinessOwnerDetails) => {
          const clientContact = await ClientContact.UpdateOrCreate(this.GetClientContactFromBusinessOwnerDetails(element), transaction);
          await Address.UpdateOrCreate(this.GetAddress(element.address, 'secondary', false, null, clientContact.id), transaction);
        }); */
        /* const clientContact = await ClientContact.UpdateOrCreate(
          this.GetClientContactFromApplication(application),
          transaction
        ); */
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
      // await DraftApplication.StoreDraftApplication(application);
    } else {
      console.log(
        'Ashraf please store this full application in Relational DB & Store ExtraData for this application in MongoDB'
      );
      // Relational DB logic ()
      const result = await this.StoreApplicationInDB(application);

      // Store Extra Data in Mongo (Shakir please create a mechanism to store extra data into mongodb)
      // completed
      // Ashraf
    }

    return res.send(application);
  };

  GetAddress = (address: IAddress, type: string, isPrimary: boolean) => {
    return {
      id: address.id,
      type: type,
      is_primary: isPrimary,
      address_line: address.address_line_1,
      premises: address.premises,
      locality: address.locality,
      country: address.country,
      post_code: address.postcode
    }
  }

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
