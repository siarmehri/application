export interface IApplication {
  business_type: IBusinessType,
  business_details: IBusinessDetails,
  business_owner_details: [IBusinessOwnerDetails],
  bank_details: IBankDetails
}

export interface IBankDetails {
  account_holder_name: string,
  bank_name: string,
  IBAN: string,
  sort_code: string,
  BIC: string,
  account_number: number,
  business_bank_statement: File
}

export interface IBusinessOwnerDetails {
  first_name: string,
  date_of_birth: string,
  last_name: string,
  country_of_registration: string,
  nationality: string,
  building_house_number: number,
  owner_street: string,
  owner_city: string,
  owner_region: string,
  owner_postcode: string,
  ownership_percentage: number,
  email_address: string,
  job_title: JobTitle,
  place_of_birth: string,
  proof_of_id: File,
  proof_of_address: File
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
  trading_name: string,
  vat_number: number,
  company_document: File,
  bank_document: File,
  certificate_of_incorporation: File,
  processing_history: File,
  Business_invoice: File
}
export interface IBusinessDetails {
  business_street_address: string,
  business_town_city: string,
  business_postcode: string,
  website: string,
  merchant_fulfillment: number,
  business_transactions_ecom: number,
  business_transactions_moto: number,
  business_transactions_pos: number,
  month_expected_card_volume: number,
  average_transaction_value: number,
  business_email: string,
  phone_number: number
}

export enum BusinessType {
  LIMITED = "Limited",
  SOLE_TRADER = "Sole Trader",
  PARTNERSHIP_LIMITED = "Partnership Limited",
  CLUB = "Club",
  CHARITY = "Charity"
}
