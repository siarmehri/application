import { Schema, model } from 'mongoose';


const clientSchema = new Schema({
  client_id: {type: Number, required: true},

  MerchantFulfilment: {type: Number, default: 5},// coming from frontend
  AverageTransactionValue: {type: Number, default: 100},// coming from frontend
  BusinessTransactionsEcom: {type: Number, default: 50},// coming from frontend
  BusinessTransactionsMOTO: {type: Number, default: 0},// coming from frontend
  BusinessTransactionsPOS: {type: Number, default: 50},// coming from frontend
  MonthExpectedCardVolume: {type: Number},// coming from frontend
  NumberOfEmployees: {type: String},
  IsSeasonalBusiness: {type: Boolean, default: false},
  ChangeOfProcessor: {type: String},
  RecurringTransactions: {type: Boolean, default: false},
  ShoppingCarts: {type: String},
  SourceofWealth: {type: String, default: 'Savings, Company Profits'},
  SourceofFunds: {type: String, default: 'Sale of Goods'},
  ChargeBackP: {type: Number, default: 0.5},
  RefundP: {type: Number, default: 1.25},
  ChosenFormCurrency: {type: String, default: "GBP"},
  Ecom: {type: Boolean},
  Moto: {type: Boolean},
  POS: {type: Boolean},
  DCC: {type: Boolean, default: false},
  EcomAmexMID: {type: String, default: ''},
  MotoAmexMID: {type: String, default: ''},
  PayByLink: {type: Boolean, default: false},
  VAU: {type: Boolean, default: false},
  ABU: {type: Boolean, default: false},
  APMs: {type: String, default: ''}
  
});
const ClientExtraData = model('Client', clientSchema);

export = ClientExtraData;

