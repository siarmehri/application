import {Schema, model} from 'mongoose'

const phoneNumberSchema = new Schema({
  id: {type: Number},
  contactId: {type: Schema.Types.ObjectId,
              ref: 'ClientContact'},
  clientId: {type: Schema.Types.ObjectId,
             ref: 'Client'},
  type: {type: String, enum: ['Primary', 'Secondry']},
  phoneNumber: {type: String}
});

const phoneNumber = model('PhoneNumber', phoneNumberSchema);
export = phoneNumber;