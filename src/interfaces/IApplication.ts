import internal from "stream"

export interface IApplication {
  business_type: IBusinessType, // half an hour -> an hour
  business_details: IBusinessDetails,
  business_owner_details: [IBusinessOwnerDetails],
  bank_details: IBankDetails,
  error?: {}
}

export enum BusinessType {
  LIMITED = "Limited", // At least one owner
  SOLE_TRADER = "Sole Trader", // Only one owner
  PARTNERSHIP_LIMITED = "Partnership Limited", // At least two owners
  CLUB = "Club", // At least 3 members of committee -> Once club selected it is not business owner anymore committee members
  CHARITY = "Charity" // At least one owner -> removed percentages
}

export interface IGetLink {
  for_field: string, //company_document, bank_document,
  file_format: string //pdf, jpeg, jpg, png
}

export interface IPutLink {
  url: string
}

export interface IBusinessType {
  company_name: string,
  registered_business_country: string,
  company_number: string,
  business_type: BusinessType,
  date_of_incorporation_or_formation: Date,
  trading_name: string,
  vat_number: string,
  company_document?: File, // Mandatory
  certificate_of_incorporation?: File, //Mandatory
  bank_document?: File,
  processing_history?: File,
  Business_invoice?: File,
  get_link?: IGetLink,
  put_link?: IPutLink,
  error?: {}
}

export interface IBusinessDetails {
  address: IAddress,
  website: string,
  merchant_fulfillment: number,
  business_transactions_ecom: number, // Defaulted
  business_transactions_moto: number, // Defaulted
  business_transactions_pos: number, // Defaulted
  month_expected_card_volume: number, // Defaulted
  average_transaction_value: number, // Defaulted
  business_email: string,
  phone_number: string
  error?: {}
}

export enum JobTitle {
  DIRECTOR = "Director",
  SHAREHOLDER = "Shareholder",
  ULTIMATE_BENEFICIAL_OWNER = "Ultimate Beneficial Owner"
}

export interface IBusinessOwnerDetails {
  id?: number,
  title?: string, // must be asked (what is title?)
  first_name: string,
  last_name: string,
  date_of_birth: Date,
  country_of_residence: string,
  nationality: string,
  address: IAddress,
  ownership_percentage: number,
  email_address: string,
  job_title: JobTitle, // Defaulted Director
  place_of_birth: string,
  is_updated?: boolean,
  is_deleted?: boolean,
  is_inserted?: boolean,
  proof_of_id?: File,
  proof_of_address?: File,
  get_link?: IGetLink
  put_link?: IPutLink
  error?: {}
}

export interface IBankDetails {
  account_holder_name: string,
  bank_name: string,
  IBAN?: string,
  sort_code: string,
  BIC?: string,
  account_number: number,
  business_bank_statement?: File, //Mandatory
  get_link?: IGetLink
  put_link?: IPutLink
  error?: {}
}

export interface IExtraApplicationData {

}

export interface IAddress {
  id?: number,
  address_line_1: string,
  premises?: string,
  locality: string,
  country: string,
  postcode: string,
  type: AddressType,
  isPrimary: boolean,
  client_id?: number,
  contact_id?: number
  error?: {}
}

export enum AddressType {
  CLIENT_ADDRESS = "contact",
  CLIENT_CONTACT_ADDRESS = "client_contact"
}