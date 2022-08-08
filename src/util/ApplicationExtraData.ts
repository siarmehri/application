import mongoose from 'mongoose';
import ClientExtraData from '../model/mongoDBModels/ClientExtraData';
import {IBusinessDetails, IApplication} from '../interfaces/IApplication';
let application = new ClientExtraData();

class ApplicationExtraData {
  // store application extra data
  storeApplicationExtraData = async (extraData: IBusinessDetails, clientID: IApplication) => {
    try{
      (await mongoose.connect('mongodb://root:example@mongo:27017/')).connection;
      let application = new ClientExtraData({
        client_id: clientID.client_id,
        MerchantFulfilment: extraData.merchant_fulfillment,
        AverageTransactionValue: extraData.average_transaction_value,
        BusinessTransactionsEcom: extraData.business_transactions_ecom,
        BusinessTransactionsMOTO: extraData.business_transactions_moto,
        BusinessTransactionsPOS: extraData.business_transactions_pos,
        MonthExpectedCardVolume: extraData.month_expected_card_volume
      })
      return Promise.resolve(await application.save());
      
    }
    catch(err){
      console.log('Error: ' + (err as any).message);
      return Promise.reject({message: (err as any).message});
    }
  }

  // get application extra data
  getApplicationExtraData = async (clientID:number) => {
    try{
      (await mongoose.connect('mongodb://root:example@mongo:27017/')).connection;
     const extraData= await ClientExtraData.findOne({client_id:clientID});
     return extraData;
    }
    catch(err){
      console.log('Error: ' + (err as any).message);
      return Promise.reject({message: (err as any).message});
    }
  }

  // delete application extra data
  deleteApplicationExtraData = async (clientID:IApplication) => {
    try{
      mongoose.createConnection('mongodb://root:example@mongo:27017/');
      await ClientExtraData.deleteOne({client_id:clientID.client_id});
    }
    catch(err){
      console.log('Error: ' + (err as any).message);
      return Promise.reject({message: (err as any).message});
    }
  }

  // update application extra data
  updateApplicationExtraData = async(extraData:IBusinessDetails, clientID:IApplication) => {
    try{
      await ClientExtraData.findOneAndUpdate(
        {client_id: clientID.client_id},
        {
           MerchantFulfilment: extraData.merchant_fulfillment,
          AverageTransactionValue: extraData.average_transaction_value,
          BusinessTransactionsEcom: extraData.business_transactions_ecom,
          BusinessTransactionsMOTO: extraData.business_transactions_moto,
          BusinessTransactionsPOS: extraData.business_transactions_pos,
          MonthExpectedCardVolume: extraData.month_expected_card_volume
        }
      )
    }
    catch(err){
      console.log('Error: ' + (err as any).message);
      return Promise.reject({message: (err as any).message});
    }
  }
}

export const appExtraData: ApplicationExtraData = new ApplicationExtraData();