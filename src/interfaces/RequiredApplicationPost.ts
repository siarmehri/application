export interface IAccount {
  our_reference: number;
  case_type_id: number;
  mode: string;
  email: string[];
  sms: string[];
  trace_pool_code: string;
  collect_pool_code: string;
  status: number;
  email_subject_placeholder: any;
  body_placeholder: any;
}