
import mongoose, { Schema } from 'mongoose';

import { IApplication, IExtraApplicationData } from '../interfaces/IApplication';

export interface IClientIDObject {
  client_id: number
}

const mongoConnection = mongoose.createConnection('mongodb://root:example@mongo:27017/');
const anySchema = new Schema({}, { strict: false })
const DraftApplication = mongoConnection.model('DraftApplication', anySchema);

class Mongoos {
  StoreDraftApplication = async (draftApplication: IApplication) => {
    try {
      const clientIdObject: IClientIDObject = {client_id: draftApplication.client_id};
      // const obj = await this.GetDraftApplication(clientIdObject);
      await this.DeleteDraftApplication(clientIdObject);
      var application = new DraftApplication(draftApplication);
      return Promise.resolve(await application.save()); // iAmNotInTheSchema is now saved to the db!!
    } catch (err) {
      console.log('Error: ' + (err as any).message);
      return Promise.reject({message: (err as any).message});
    }
  }

  DeleteDraftApplication = async (clientIdObject: IClientIDObject) => {
    await DraftApplication.deleteMany(clientIdObject);
  }

  GetDraftApplication = async (clientIdObject: IClientIDObject) => {
    await DraftApplication.findOne(clientIdObject);
  }
  // StoreApplicationExtraData = async (application: IExtraApplicationData) => {
  //   const mongoConnection = mongoose.createConnection('mongodb://root:example@mongo:27017/');
  //   const applicationModel = mongoConnection.model('Application', ApplicationExtraData);
  //   const m = new applicationModel({name: "Siar"});
  //   await m.save();
  // }

}

export const MongoosClass: Mongoos = new Mongoos();