import {Schema, model} from 'mongoose'

const emailSchema = new Schema({
  id: {type: Number},
  contactId: {type: Schema.Types.ObjectId,
              ref: 'ClientContact'},
  clientId: {type: Schema.Types.ObjectId,
             ref: 'Client'},
  type: {type: String, enum: ['Primary', 'Secondry']},
  emailAddress: {type: String}
});

const email = model('Email', emailSchema);
export = email;