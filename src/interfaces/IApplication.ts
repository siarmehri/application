export interface IApplication {
  business_type: IBusinessType,
  business_details: IBusinessDetails,
  business_owner_details: [IBusinessOwnerDetails],
  bank_details: IBankDetails,
  error?: {}
}

export interface IExtraApplicationData {
  
}

export interface IBankDetails {
  account_holder_name: string,
  bank_name: string,
  IBAN?: string,
  sort_code: string,
  BIC?: string,
  account_number: number,
  business_bank_statement?: File
  error?: {}
}

export interface IBusinessOwnerDetails {
  id?: number,
  first_name: string,
  last_name: string,
  date_of_birth: Date,
  country_of_residence: string,
  nationality: string,
  address: IAddress,
  ownership_percentage: number,
  email_address: string,
  job_title: JobTitle,
  place_of_birth: string,
  is_updated?: boolean,
  is_deleted?: boolean,
  is_inserted?: boolean,
  proof_of_id?: File,
  proof_of_address?: File
  error?: {}
}


export enum JobTitle {
  DIRECTOR = "Director",
  SHAREHOLDER = "Shareholder",
  ULTIMATE_BENEFICIAL_OWNER = "Ultimate Beneficial Owner"
}

export interface IBusinessType {
  company_name: string,
  registered_business_country: string,
  company_number: string,
  business_type: BusinessType,
  date_of_incorporation_or_formation: Date,
  trading_name: string, // What is the difference between trading name and company name.
  vat_number: number,
  company_document?: File,
  bank_document?: File,
  certificate_of_incorporation?: File,
  processing_history?: File,
  Business_invoice?: File,
  error?: {}
}

export interface IAddress {
  address_line_1: string,
  premises?: string,
  locality: string,
  country: string,
  postcode: string,
  type: AddressType
  error?: {}
}

export enum AddressType {
  CLIENT_ADDRESS = "contact",
  CLIENT_CONTACT_ADDRESS = "client_contact"
}

export interface IBusinessDetails {
  address: IAddress,
  website: string,
  merchant_fulfillment: number,
  business_transactions_ecom: number,
  business_transactions_moto: number,
  business_transactions_pos: number,
  month_expected_card_volume: number,
  average_transaction_value: number,
  business_email: string,
  phone_number: string
  error?: {}
}

export enum BusinessType {
  LIMITED = "Limited",
  SOLE_TRADER = "Sole Trader",
  PARTNERSHIP_LIMITED = "Partnership Limited",
  CLUB = "Club",
  CHARITY = "Charity"
}
