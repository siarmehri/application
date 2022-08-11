import { Request, Response } from "express";
import {CountryList} from '../util/countryListCollection';

export class Country {

  PostCountry = async (req: Request, res: Response) => {
    try{
      const {name} = req.body;
      await CountryList.storeCountry({name:name.toLowerCase()})
      res.send('Country inserted successfuly!')
    }
    catch(err){
      return Promise.reject(err);
    }
  }

  GetCountry = async (req: Request, res: Response) => {
    try{
      console.log('in controller')
      const {name} = req.params;
      const country = await CountryList.getCountry(name.toString().toLowerCase());
      //console.log(country)
      res.send(country)

    }
    catch(err){
      return Promise.reject(err);
    }
  }

  GetCountries = async (req:Request, res: Response) => {
    try{
      const countries = await CountryList.getAllCountries();
      if(!countries){
        res.status(404).send("country list is empty!")
      }
      else{
        res.send(countries)
      }
    }
    catch(err){
      Promise.reject(err)
    }
  }

  DeleteCountry = async (req: Request, res:Response) => {
    try{
      
      const {name} = req.params;
      const deleted = await CountryList.deleteCountry(name.toString().toLowerCase());
      if(deleted > 0){
        res.send('country deleted successfuly!')
      }
      else{
        res.send('country name not found!')
      }
    }
    catch(err){
      return Promise.reject(err);
    }
  }
}

export const CountryController: Country = new Country();
