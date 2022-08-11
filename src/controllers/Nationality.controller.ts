import { Request, Response } from "express";
import {NationalityList} from '../util/nationalitiesCollection';



export class Nationality {

  PostNationality = async (req: Request, res: Response) => {
    try{
      const {name} = req.body;

      await NationalityList.storeNationality({name:name.toLowerCase()})

      res.send('Nationality inserted successfuly!')
    }
    catch(err){
      return Promise.reject(err);
    }
  }
  GetNationalities = async (req:Request, res: Response) => {
    try{
      const nationalities = await NationalityList.getAllNationalities();
      if(!nationalities){
        res.status(404).send("no nationality was found!")
      }
      else{
        res.send(nationalities)
      }
    }
    catch(err){
      Promise.reject(err)
    }
  }

  GetNationality = async (req: Request, res: Response) => {
    try{

      const {name} = req.params;
      const nationality = await NationalityList.getNationality(name.toString().toLowerCase());
      if(!nationality){
        res.status(404).send("nationality not found!");
      }
      else{
        res.send(nationality);
      }

    }
    catch(err){
      return Promise.reject(err);
    }
  }

  DeleteNationality = async (req: Request, res:Response) => {
    try{
      
      const {name} = req.params;
      const deleted = await NationalityList.deleteNationality(name.toString());
      if(deleted > 0){
        res.send('nationality deleted successfuly!')
      }
      else{
        res.send('nationality name not found!')
      }
    }
    catch(err){
      return Promise.reject(err);
    }
  }
}

export const NationalityController: Nationality = new Nationality();