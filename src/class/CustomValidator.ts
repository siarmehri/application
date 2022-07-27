import { NextFunction, Request, Response } from "express";
import validator from "validator";
import { AddressType, BusinessType, IApplication, IBusinessType, JobTitle } from "../interfaces/IApplication";

type TypeOfPrimitive = "boolean" | "number" | "string";
type Primitives = boolean | number | string;

export class Validator {
  IsValidDate = (param: string | Date) => {
    if (
      (typeof param === "string" && isNaN(Date.parse(param))) ||
      !(new Date(param) instanceof Date)
    ) {
      return false;
    }
    return true;
  }

  private static GetRequiredApplicationPostRequestFields() {
    /* const ICampaignPayloadObj: ICampaignPayload = {
    };

    return Object.keys(ICampaignPayloadObj); */
  }


  GetMockApplication = (): IApplication => {
    return {
      business_type: {
        company_name: 'Devondemand UK Ltd.',
        registered_business_country: 'UK',
        company_number: '1232abc',
        business_type: BusinessType.LIMITED,
        date_of_incorporation_or_formation: new Date(2022, 3, 13),
        trading_name: 'Devondemand UK Ltd.',
        vat_number: "9898989ab",
      },
      business_details: {
        address: {
          address_line_1: "2 Grain Street",
          locality: 'Bradford',
          country: 'UK',
          postcode: 'BD5 9EZ',
          isPrimary: true,
          type: AddressType.CLIENT_ADDRESS
        },
        website: 'https://devondemand.co.uk',
        merchant_fulfillment: 10,
        business_transactions_ecom: 10,
        business_transactions_moto: 10,
        business_transactions_pos: 0,
        month_expected_card_volume: 10,
        average_transaction_value: 1000,
        business_email: 'siarmehri@devondemand.co.uk',
        phone_number: '07492051788'
      },
      business_owner_details: [
        {
          first_name: 'Ahmad Siar',
          last_name: 'Mehri',
          date_of_birth: new Date(1999, 5, 19),
          country_of_residence: 'UK',
          nationality: 'Afghan',
          address: {
            address_line_1: "2 Grain Street",
            locality: 'Bradford',
            country: 'UK',
            postcode: 'BD5 9EZ',
            isPrimary: false,
            type: AddressType.CLIENT_CONTACT_ADDRESS,
          },
          ownership_percentage: 100,
          email_address: 'siarmehri@devondemand.co.uk',
          job_title: JobTitle.DIRECTOR,
          place_of_birth: 'Afghanistan',
        }
      ],
      bank_details: {
        account_holder_name: 'Ahmad Siar Mehri',
        bank_name: 'Lloyds Bank',
        account_number: 87654321,
        sort_code: '89-90-98'
      }
    }
  }

  IsValidStructure = (application: IApplication, mockApplication: IApplication) => {
    this.ObjectHasKeys(application, Object.keys(mockApplication), 'application_object');
    this.ObjectHasKeys(application.business_type, Object.keys(mockApplication.business_type));
    this.ObjectHasKeys(application.business_details, Object.keys(mockApplication.business_details));
    this.ObjectHasKeys(application.business_details.address,
      Object.keys(mockApplication.business_details.address)
    );
    this.IsArray(application.business_owner_details, 'business_owner_details');
    let counter = 0;
    application.business_owner_details.forEach((businessOwner) => {
      this.ObjectHasKeys(businessOwner,
        Object.keys(mockApplication.business_owner_details[0]),
        `business_owner_details_object ${counter}`
      );
      this.ObjectHasKeys(
        businessOwner.address,
        Object.keys(mockApplication.business_owner_details[0].address),
        `business_owner_details_object ${counter}`
      );
      counter++;
    });
    this.ObjectHasKeys(application.bank_details, Object.keys(mockApplication.bank_details), 'bank_details');
  }

  IsValidBusinessType = (businessType: IBusinessType, mockBusinessType: any) => {
    const error: any = {};
    Object.entries(businessType).forEach((element) => {
      const typeOfField = typeof mockBusinessType[element[0]];
      const businessTypeValues = Object.values(BusinessType);
      if (element[0] === 'business_type' && !businessTypeValues.includes(element[1])) {
        error[element[0]] = `${element[0]} needs to be one of ${businessTypeValues.join(', ')} values`;
      } else if(typeOfField === 'number' && !this.IsValidPrimitivePost(+element[1], typeOfField as TypeOfPrimitive)) {
        error[element[0]] = `${element[0]} is not a valid ${typeOfField}`
      } else if((typeOfField === 'string' || typeOfField === 'boolean') && !this.IsValidPrimitivePost(element[1], typeOfField as TypeOfPrimitive)) {
        error[element[0]] = `${element[0]} is not a valid ${typeOfField}`
      } else if (mockBusinessType[element[0]] instanceof Date && !this.IsValidDate(element[1])) {
        error[element[0]] = `${element[0]} is not a valid Date`
      }
    });
    return error;
  }

  IsValidFields = (application: IApplication, mockApplication: IApplication) => {
    const businessTypeErrors = this.IsValidBusinessType(application.business_type, mockApplication.business_type);
    if (JSON.stringify(businessTypeErrors) !== JSON.stringify({})) {
      application.business_type.error = businessTypeErrors;
    }


    /* const businessDetailsErrors = this.IsValidBusinessType(application.business_type, mockApplication.business_type);
    if (JSON.stringify(businessTypeErrors) !== JSON.stringify({})) {
      application.business_type.error = businessTypeErrors;
    } */


    let applicationLevelError = {...businessTypeErrors/* , ...businessDetailsErrors */};
    if (JSON.stringify(applicationLevelError) !== JSON.stringify({})) {
      application.error = applicationLevelError;
    }
    return application;
  }

  IsValidApplicationRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const application: IApplication = req.body;
    try {
      const mockApplication = this.GetMockApplication();
      this.IsValidStructure(application, mockApplication);
      req.body = this.IsValidFields(application, mockApplication);
      return next();
    } catch (err) {
      return res.status(400).send({ message: (err as any).message });
    }
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

  IsArray = (arr: any, name: string) => {
    if (!Array.isArray(arr)) {
      throw new Error(`${name} is not an array`);
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
      if (!validator.isEmail(email)) {
        throw new Error(`Is not a valid email`);
      }
    } catch (err) {
      throw new Error(`${name} has error: ${(err as any).message}`);
    }
  }
  IsEmailPost = (email: string, name: string) => {
    try {
      if (!validator.isEmail(email)) {
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