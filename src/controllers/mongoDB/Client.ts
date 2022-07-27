import ClientModel from '../../model/mongoDBModels/Client';
import {Request, Response} from 'express';
import {IApplication} from '../../interfaces/IApplication'

class Client{
  createClient = async (req: Request, res: Response)=> {

    const clientData: IApplication = req.body;
    const company_name = clientData.business_type.company_name;
    const registered_business_country = clientData.business_type.registered_business_country;
    const company_number = clientData.business_type.company_number;
    const business_type = clientData.business_type.business_type;
    const date_of_incorporation_or_formation = clientData.business_type.date_of_incorporation_or_formation;
    const trading_name = clientData.business_type.trading_name;
    const vat_number = clientData.business_type.vat_number;
    const company_document = clientData.business_type.company_document;
    const bank_document = clientData.business_type.bank_document;
    const certificate_of_incorporation = clientData.business_type.certificate_of_incorporation;
    const processing_history = clientData.business_type.processing_history;
    const Business_invoice = clientData.business_type.Business_invoice;
    const business_transactions_ecom = clientData.business_details.business_transactions_ecom;
    const business_transactions_moto = clientData.business_details.business_transactions_moto;
    const business_transactions_pos = clientData.business_details.business_transactions_pos;
    const month_expected_card_volume = clientData.business_details.month_expected_card_volume;
    const average_transaction_value = clientData.business_details.average_transaction_value;
    
    const client = new ClientModel({
      company_name: company_name,
      registered_business_country: registered_business_country,
      company_number: company_number,
      business_type: business_type,
      date_of_incorporation_or_formation: date_of_incorporation_or_formation,
      trading_name:trading_name,
      vat_number: vat_number,
      company_document: company_document,
      bank_document: bank_document,
      certificate_of_incorporation: certificate_of_incorporation,
      processing_history: processing_history,
      business_invoice: Business_invoice,
      BusinessTransactionsEcom: business_transactions_ecom,
      BusinessTransactionsMOTO: business_transactions_moto,
      BusinessTransactionsPOS: business_transactions_pos,
      MonthExpectedCardVolume: month_expected_card_volume,
      AverageTransactionValue: average_transaction_value
    })
    await client.save();
  }


}


export const client = new Client();