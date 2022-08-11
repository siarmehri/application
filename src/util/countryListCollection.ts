import mongoose, {Schema} from "mongoose";
import fs from 'fs';
import * as path from 'path';


const mongoConnection = mongoose.createConnection('mongodb://root:example@mongo:27017/');
const anySchema = new Schema({}, { strict: false })
const CountryModel = mongoConnection.model('Countries', anySchema);

class CountryListCollection {

  Seeder = async () => {
    let newSeed = [];
    const countryFound = await CountryModel.find({}).exec();
    if(countryFound.length === 0){
      //console.log('nothing found!')
      let countries = fs.readFileSync( path.join(__dirname,'../countries.json'));
      const seedData = JSON.parse(countries.toString());
      for(const seed of seedData){
        let countryName = seed.name.replaceAll(' ', '_');
        countryName = countryName.toLowerCase()
        newSeed.push({value: countryName, label:seed.name, code:seed?.code || seed.name});
      }
      await CountryModel.insertMany(newSeed);
    }
  }

  storeCountry = async (country: any) => {
    try {
      const {name} = country; 
      await this.deleteCountry(name);
      var country = await new CountryModel(country);
      //console.log(country)
      return Promise.resolve(await country.save());
    } catch (err) {
      console.log('Error: ' + (err as any).message);
      return Promise.reject({message: (err as any).message});
    }
  }

  getCountry = async (countryName : String) => {
    try{
      const country = await CountryModel.findOne({value: countryName});
      //console.log(country)
      return country;
    }
    catch(err){
      console.log('Error: ' + (err as any).message);
      return Promise.reject({message: (err as any).message});
    }
  }

  getAllCountries = async () =>{
    try{
       await this.Seeder();
      const countries= await CountryModel.find({},{_id:0, __v:0});
      //console.log(countries);
      return countries;
    }
    catch(err){
      console.log('Error: ' + (err as any).message);
      return Promise.reject({message: (err as any).message});
    }
  }


  deleteCountry = async (countryName:String) => {
    try{
      const {deletedCount} = await CountryModel.deleteOne({label: countryName});
      //console.log(country);
      return deletedCount;
    }
    catch(err) {
      console.log('Error: ' + (err as any).message);
      return Promise.reject({message: (err as any).message});
    }
  }
}

export const CountryList: CountryListCollection = new CountryListCollection();