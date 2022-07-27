
import mongoose from 'mongoose';
import Client from '../model/mongoDBModels/Client';

import { IApplication, IExtraApplicationData } from '../interfaces/IApplication';

const DraftApplication = new mongoose.Schema ({
    name: { type: String, default: 'anonymous' },
  });

const ApplicationExtraData = new mongoose.Schema ({
  name: { type: String, default: 'anonymous' },
});


class Mongoos {
  StoreDraftApplication = async () => {
    mongoose.connect('mongodb://localhost/swipenDB')
    const m = new Client({id:1, company_name: 'abc'});
    await m.save();
  }

  // StoreApplicationExtraData = async (application: IExtraApplicationData) => {
  //   const mongoConnection = mongoose.createConnection('mongodb://root:example@mongo:27017/');
  //   const applicationModel = mongoConnection.model('Application', ApplicationExtraData);
  //   const m = new applicationModel({name: "Siar"});
  //   await m.save();
  // }

}

export const MongoosClass: Mongoos = new Mongoos();