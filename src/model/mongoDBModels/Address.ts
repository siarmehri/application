import { Schema, model } from 'mongoose';
import {IAddress} from '../../interfaces/IApplication'

const addressSchema = new Schema({
  id: {type: Number, required: true},
  contactId: {type: Schema.Types.ObjectId,
              ref: 'ClientContact'},
  clientId: {type: Schema.Types.ObjectId,
             ref: 'Client'},
  address_line_1: {type: String},
  premises: {type: String},
  locality: {type: String},
  country: {type: String},
  postcode: {type: String},
  isPrimary: {type: Boolean},
  type: {type: String, enum: ['contact', 'client_contact']}
});

const Address = model('Address', addressSchema);

export = Address;