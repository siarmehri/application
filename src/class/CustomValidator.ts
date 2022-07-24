import { NextFunction, Request, Response } from "express";
import validator from "validator";

type TypeOfPrimitive = "boolean" | "number" | "string";
type Primitives = boolean | number | string;

export class Validator {
  IsValidDate = (param: string | Date, name: string) => {
    if (
      (typeof param === "string" && isNaN(Date.parse(param))) ||
      !(new Date(param) instanceof Date)
    ) {
      throw new Error(`${name} is not a valid date`);
    }
  }

  private static GetRequiredApplicationPostRequestFields() {
    /* const ICampaignPayloadObj: ICampaignPayload = {
    };

    return Object.keys(ICampaignPayloadObj); */
  }


  IsValidApplicationPostRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { age_of_husband, age_of_wife }: any = req.body;

    const errorMap: any = {};
    if(!this.IsValidPrimitivePost(+age_of_husband, "number")) {
      errorMap.age_of_husband =`${age_of_husband} is not a valid number`;
    }

    if(!this.IsValidPrimitivePost(+age_of_wife,  "number")) {
      errorMap.age_of_wife =  `${age_of_wife} is not a valid number`;
    }
    req.body.error_map = errorMap;
    return next();
  };

  IsValidPrimitivePost = (
    param: Primitives,
    type: TypeOfPrimitive
  ) => {
    if (!param || typeof param !== type) {
      return false;
    }
    return true;
  }

  IsValidPrimitive = (
    param: Primitives,
    name: string,
    type: TypeOfPrimitive
  ) => {
    if (!param || typeof param !== type) {
      throw new Error(`${name} is not a valid ${type}`);
    }
  }

  IsValidArrayWithItems = (arr: any, name: string) => {
    if (!Array.isArray(arr)) {
      throw new Error(`${name} is not an array`);
    }

    if (!arr.length) {
      throw new Error(`${name} is an empty array`);
    }
  }

  IsEmail = (email: string, name: string) => {
    try {
      if(!validator.isEmail(email)) {
        throw new Error(`Is not a valid email`);
      }
    } catch (err) {
      throw new Error(`${name} has error: ${(err as any).message}`);
    }
  }
  IsEmailPost = (email: string, name: string) => {
    try {
      if(!validator.isEmail(email)) {
        throw new Error(`Is not a valid email`);
      }
    } catch (err) {
      return `${name} has error: ${(err as any).message}`;
    }
  }
  ObjectHasKeys = (
    obj: object,
    fields: string[],
    objectName: string = "object"
  ) => {
    const objKeys = Object.keys(obj);
    fields.forEach((f) => {
      if (!objKeys.includes(f)) {
        throw new Error(`${f} is required field in ${objectName}`);
      }
    });
  }
}

export const CustomValidator: Validator = new Validator();