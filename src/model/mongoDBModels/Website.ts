import {Schema, model} from 'mongoose'

const websiteSchema = new Schema({
  id: {type: Number},
  clientId: {type: Schema.Types.ObjectId,
             ref: 'Client'},
  url: {type: String}
});

const website = model('Website', websiteSchema);
export = website;