import { NextFunction, Request, Response } from "express";

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

  IsValidApplicationRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { age_of_husband, age_of_wife }: any = req.query;
      this.IsValidPrimitive(+age_of_husband, 'age_of_husband', "number");
      this.IsValidPrimitive(+age_of_wife, 'age_of_wife', "number");
      return next();
    } catch (err) {
      return res.status(400).send({ message: (err as any).message });
    }
  };

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

  private static GetRequiredStoreCampaignPayloadFields() {
/*     const ICampaignPayloadObj: ICampaignPayload = {
      job_id: 1,
      template_id: 1,
      file_storage_path: "string",
      ignore_closed: true,
      ignore_stopped: true,
      ignore_paying: true,
      ignore_arrear: true,
      is_active: true,
      added_by: `SM7`,
      scheduled_date: new Date(),
      accounts: [{ our_reference: 1, scheduled_date: new Date(), case_type_id: 1 }],
    };
 */
//    return Object.keys(ICampaignPayloadObj);
  }
}

export const CustomValidator: Validator = new Validator();