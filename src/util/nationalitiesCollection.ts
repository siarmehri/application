import mongoose, {Schema} from "mongoose";
import fs from 'fs';
import * as path from 'path';
const mongoConnection = mongoose.createConnection('mongodb://root:example@mongo:27017/');
const anySchema = new Schema({}, { strict: false })
const NationalityModel = mongoConnection.model('Nationalities', anySchema);

class NationalitiesCollection {
  Seeder = async () => {

    let newSeed = [];
    const nationalityFound = await NationalityModel.find({}).exec();
    if(nationalityFound.length === 0){
      //console.log('nothing found!')
      let nationalities = fs.readFileSync( path.join(__dirname,'../nations.json'));
      const seedData = JSON.parse(nationalities.toString());
      console.log(seedData);
      for(const seed of seedData){
        let nationalityValue = seed.nationality.replace(' - ', '_');
        nationalityValue = nationalityValue.replaceAll(' ', '_');
        nationalityValue = nationalityValue.toLowerCase();
        newSeed.push({value:nationalityValue, label: seed.nationality})
      }
      await NationalityModel.insertMany(newSeed);
    }
  }

  storeNationality = async (nationality: any) => {
    try {
      const {name} = nationality;
      await this.deleteNationality(name.toLowerCase());
        
      var nationality = await new NationalityModel(nationality);
      //console.log(country)
      return Promise.resolve(await nationality.save());
      
    } catch (err) {
      console.log('Error: ' + (err as any).message);
      return Promise.reject({message: (err as any).message});
    }
  }

  getNationality = async (nationalityName : String) => {

    try{
      const nationality = await NationalityModel.findOne({value: nationalityName});
      //console.log(nationality)
      return nationality;
    }
    catch(err){
      console.log('Error: ' + (err as any).message);
      return Promise.reject({message: (err as any).message});
    }
  }

  getAllNationalities = async () =>{
    try{
      await this.Seeder();
      const nationalities= await NationalityModel.find({},{_id:0, __v:0});
      //console.log(nationalities);
      return nationalities;
    }
    catch(err){
      console.log('Error: ' + (err as any).message);
      return Promise.reject({message: (err as any).message});
    }
  }

  deleteNationality = async (nationalityName:String) => {
    try{
      const {deletedCount} = await NationalityModel.deleteOne({value: nationalityName});
      //console.log(deletedCount);
      return deletedCount;
    }
    catch(err) {
      console.log('Error: ' + (err as any).message);
      return Promise.reject({message: (err as any).message});
    }
  }
}

export const NationalityList: NationalitiesCollection = new NationalitiesCollection();