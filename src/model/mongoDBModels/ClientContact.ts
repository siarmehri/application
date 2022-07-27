import { Schema, model } from 'mongoose';


const clientContactSchema = new Schema({
  id: {type: Number, required: true},
  clientId: {type: Schema.Types.ObjectId,
             ref: 'Client'},
  title: {type: String},
  first_name: {type: String},
  last_name: {type: String},
  date_of_birth: {type: Date},
  country_of_residence: {type:String},
  nationality: {type:String},
  ownership_percentage: {type: Number},
  email_address: {type:String},
  isSignatory: {type: Boolean},
  job_title: {type:String, enum: ['Director', 'Shareholder', 'Ultimate Beneficial Owner']},
  place_of_birth: {type:String},
  is_updated: {type: Boolean},
  is_deleted: {type: Boolean},
  is_inserted: {type: Boolean},
  proof_of_id: {type: String},
  proof_of_address: {type:String}
}); 

const ClientContact = model('ClientContact', clientContactSchema);
export = ClientContact;