import { Request, Response } from "express";
import { DraftApplication } from "../util/DraftApplicationCollection";
import {
  IAddress,
  IApplication,
  IBusinessOwnerDetails,
  BusinessType,
  AddressType,
} from "../interfaces/IApplication";
import { appExtraData } from "../util/ApplicationExtraData";
import { Client } from "../model/Client";
import { sequelize } from "../util/sequelize";
import { Website } from "../model/website";
import { ClientContact } from "../model/ClientContact";
import { Address } from "../model/Address";
import { Transaction } from "sequelize";
import { IClient } from "../model/Client";
import { ClientAddress } from "../model/ClientAddress";
import { ClientContactAddress } from "../model/ClientContactAddress";
import { BankDetail } from "../model/BankDetail";

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
      date_of_incorporation: application.business_type.date_of_incorporation,
    };
  };
  GetWebsiteFromApplication = (
    application: IApplication,
    client_id: number
  ): any => {
    return {
      urls: application.business_details.website,
      client_id: client_id,
    };
  };

  GetBankDetailsFromApplication = (
    application: IApplication,
    client_id: number
  ): any => {
    return {
      full_name: application.bank_details.account_holder_name,
      bank_name: application.bank_details.bank_name,
      sort_code: application.bank_details.sort_code,
      bank_account_number: application.bank_details.account_number,
      client_id: client_id,
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
  GetClientContactFromBusinessOwnerDetails = (
    businessOwnerDetail: IBusinessOwnerDetails,
    client_id: any
  ): any => {
    console.log("function", businessOwnerDetail);
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
      place_of_birth: businessOwnerDetail.place_of_birth,
      client_id: client_id,
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
        for (let element of application.business_owner_details) {
          const clientContact = await ClientContact.UpdateOrCreate(
            this.GetClientContactFromBusinessOwnerDetails(element, client.id),
            transaction
          );
          const clientContactAddress = await ClientContactAddress.FindOne(
            clientContact.id,
            transaction
          );
          if (clientContactAddress instanceof ClientContactAddress) {
            element.address.id = clientContactAddress.address_id;
            await Address.UpdateOrCreate(
              this.GetAddress(element.address, "secondary", false),
              transaction
            );
          } else {
            console.log("address", element.address);
            const contactAddress = await Address.UpdateOrCreate(
              this.GetAddress(element.address, "secondary", false),
              transaction
            );
            await ClientContactAddress.CreateOrReturn(
              clientContact.id,
              contactAddress.id,
              transaction
            );
          }
        }

        const clientAddress = await ClientAddress.FindOne(
          client.id,
          transaction
        );

        // Address for the client which is a business address
        if (clientAddress instanceof ClientAddress) {
          application.business_details.address.id = clientAddress.address_id;
          await Address.UpdateOrCreate(
            this.GetAddress(
              application.business_details.address,
              "secondary",
              false
            ),
            transaction
          );
        } else {
          const address = await Address.UpdateOrCreate(
            this.GetAddress(
              application.business_details.address,
              "secondary",
              false
            ),
            transaction
          );
          await ClientAddress.CreateOrReturn(
            client.id,
            address.id,
            transaction
          );
        }
        const businessWebsite = await Website.UpdateOrCreate(
          this.GetWebsiteFromApplication(application, client.id),
          transaction
        );
        const bankDetails = await BankDetail.UpdateOrCreate(
          this.GetBankDetailsFromApplication(application, client.id),
          transaction
        );
        return Promise.resolve({ message: "ok" });

        /*
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
    try {
      const application: IApplication = req.body;

      if (
        application.error &&
        JSON.stringify(application.error) !== JSON.stringify({})
      ) {
        // Shakir
        await DraftApplication.StoreDraftApplication(application);
      } else {
        console.log(
          "Ashraf please store this full application in Relational DB & Store ExtraData for this application in MongoDB"
        );
        // Relational DB logic ()

        this.StoreApplicationInDB(application);
        // Store Extra Data in Mongo (Shakir please create a mechanism to store extra data into mongodb)
        await appExtraData.storeApplicationExtraData(
          application.business_details,
          application
        );

        // completed
        // Ashraf
        // Store Extra Data in Mongo (Shakir please create a mechanism to store extra data into mongodb)
        // completed
        // Ashraf
        await DraftApplication.DeleteDraftApplication({
          client_id: application.client_id,
        });
      }

      return res.send(application);
    } catch (err) {
      console.log(err);
    }
  };
  
  UpdateApplication = async (req: Request, res: Response) => {
    const { id } = req.params;
    try{

    }
    catch(err){
      console.log(err);
      
    }
  }


  GetAddress = (address: IAddress, type: string, isPrimary: boolean) => {
    return {
      id: address.id,
      type: type,
      is_primary: isPrimary,
      address_line: address.address_line_1,
      premises: address.premises,
      locality: address.locality,
      country: address.country,
      post_code: address.postcode,
    };
  };


  GetApplication = async (req: Request, res: Response) => {
    const { id } = req.params;
    const draftApp = await DraftApplication.GetDraftApplication({
      client_id: parseInt(id),
    });

    if (draftApp) {
      console.log("in if");
      return res.send(draftApp);
    } else {
      console.log(" in else ");
      // 2 if nothing in mongo db take full scope of client and rebuild the IApplication Object return that object to FE
      const client = await Client.scope("full").findByPk(id);
      if (!client) {
        return res.status(404).send({ message: "client not found" });
      }
      const extraData = await appExtraData.getApplicationExtraData(
        parseInt(id)
      );
      console.log("Extra data", extraData);

      let website: any;
      let clientContacts: any;

      client.websites.forEach(async (element: any) => {
        website = element.urls;
      });
      client.clientContacts.forEach(async (element: any) => {
        clientContacts = element;
      });
      const applicationObject: IApplication = {
        business_type: {
          company_name: client.business_name,
          registered_business_country: client.country,
          company_number: client.company_registration_number,
          date_of_incorporation: client.date_of_incorporation,
          trading_name: client.trading_name,
          vat_number: client.vat_number,
        },
        business_details: {
          address: {
            type: AddressType.CLIENT_ADDRESS,
            is_primary: client.addresses[0].is_primary,
            address_line_1: client.addresses[0].address_line,
            premises: client.addresses[0].premises,
            locality: client.addresses[0].locality,
            country: client.addresses[0].country,
            postcode: client.addresses[0].post_code,
          },
          website: website,
          merchant_fulfillment: 10,
          business_transactions_ecom: 10,
          business_transactions_moto: 10,
          business_transactions_pos: 0,
          month_expected_card_volume: 10,
          average_transaction_value: 1000,
          business_email: "siarmehri@devondemand.co.uk",
          phone_number: "07492051788",
        },
        business_owner_details: clientContacts,
        bank_details: {
          account_holder_name: client.bankDetails.full_name,
          bank_name: client.bankDetails.bank_name,
          account_number: client.bankDetails.bank_account_number,
          sort_code: client.bankDetails.sort_code,
        },
      };

      // {
      //     "id": 1,
      //     "business_name": "last testing",
      //     "trading_name": "Devondemand.",
      //     "business_type": "Limited",
      //     "company_registration_number": "1232abc",
      //     "mcc_code": null,
      //     "contract_end_date": null,
      //     "years_in_business": null,
      //     "country": "UK",
      //     "vat_number": "3423434",
      //     "date_of_incorporation": "2022-01-01T01:00:00.000Z",
      //     "finance_status": null,
      //     "status": null,
      //     "sub_status": null,
      //     "status_date": null,
      //     "sub_status_date": null,
      //     "clientContacts": [
      //         {
      //             "id": 1,
      //             "title": null,
      //             "first_name": "yaseen khan",
      //             "last_name": "Babar",
      //             "birth_date": "1999-05-20T00:00:00.000Z",
      //             "nationality": "Afghan",
      //             "country_of_residence": "UK",
      //             "share_holding_percentage": 100,
      //             "role": "DIRECTOR",
      //             "place_of_birth": "Afghanistan",
      //             "is_signatory": null,
      //             "client_id": 1,
      //             "addresses": [
      //                 {
      //                     "id": 1,
      //                     "type": "secondary",
      //                     "is_primary": false,
      //                     "address_line": "2 Grain Street",
      //                     "premises": null,
      //                     "locality": "Bradford",
      //                     "country": "UK",
      //                     "post_code": "345345"
      //                 }
      //             ],
      //             "phoneNumbers": [],
      //             "emails": []
      //         }
      //     ],
      //     "addresses": [
      //         {
      //             "id": 2,
      //             "type": "secondary",
      //             "is_primary": false,
      //             "address_line": "malajat",
      //             "premises": "Gate number 4 ",
      //             "locality": "Bradford",
      //             "country": "UK",
      //             "post_code": "345345"
      //         }
      //     ],
      //     "phoneNumbers": [],
      //     "emails": [],
      //     "websites": [
      //         {
      //             "id": 1,
      //             "urls": "https://facebook.com",
      //             "client_id": 1
      //         }
      //     ],
      //     "bankDetails": {
      //         "id": 1,
      //         "full_name": "weldone",
      //         "bank_account_number": "87654321",
      //         "sort_code": "89-90-98",
      //         "bank_name": "Lloyds Bank",
      //         "iban": null,
      //         "client_id": 1
      //     }
      // }

      //

      //   let Address: any = {
      //     type: '',
      //     is_primary: '',
      //     address_line: '',
      //     premises: '',
      //     locality: '',
      //     country: '',
      //     post_code: '',
      //   };
      //   let clientContacts: any = {
      //     first_name: '',
      //     last_name: '',
      //     date_of_birth: '',
      //     country_of_residence: '',
      //     nationality: '',
      //     address: Address,
      //     ownership_percentage: 0,
      //     email_address: '',

      //     place_of_birth: '',
      //   };

      //
      //   client.addresses.forEach(async (element: any) => {
      //     Address = element;
      //   });
      //

      //   console.log('CLIENTADDREES', Address);

      //   let constarrayOfObjects: IApplication = {
      //     business_type: {
      //       company_name: client.business_name,
      //       registered_business_country: client.country,
      //       company_number: client.company_registration_number,
      //       date_of_incorporation: client.date_of_incorporation,
      //       trading_name: client.trading_name,
      //       vat_number: client.vat_number,
      //     },
      //     business_details: {
      //       address: Address,
      //       website: website,
      //       merchant_fulfillment: 10,
      //       business_transactions_ecom: 10,
      //       business_transactions_moto: 10,
      //       business_transactions_pos: 0,
      //       month_expected_card_volume: 10,
      //       average_transaction_value: 1000,
      //       business_email: 'siarmehri@devondemand.co.uk',
      //       phone_number: '07492051788',
      //     },
      //     business_owner_details: clientContacts,
      //     bank_details: {
      //       account_holder_name: client.bankDetails.full_name,
      //       bank_name: client.bankDetails.bank_name,
      //       account_number: client.bankDetails.bank_account_number,
      //       sort_code: client.bankDetails.sort_code,
      //     },
      //   };

      //   console.log('values', constarrayOfObjects);
      //   return res.send(constarrayOfObjects);
      return res.send(applicationObject);
    }
    // take client_id from jwt Ashraf ->
    // 1. Mongo DB Draft Application (In this scenario no need to take it from relational db)
    // 2 if nothing in mongo db take full scope of client and rebuild the IApplication Object return that object to FE
  };
}

export const ApplicationController: Application = new Application();
