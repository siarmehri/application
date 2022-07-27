import {Schema, model} from 'mongoose'

const bankDetailsSchema = new Schema({
  id: {type: Number},
  clientId: {type: Schema.Types.ObjectId,
             ref: 'Client'},
  fullName: {type: String},
  bankAccountNumber: {type: String},
  sortCode: {type: String},
  bankName: {type: String},
  IBAN: {type: String},
  BIC: {type: String}
});

const bankDetail = model('BankDetail', bankDetailsSchema);
export = bankDetail;