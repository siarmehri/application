import {
  Table, Column, Model, Default,
  UpdatedAt, CreatedAt, AutoIncrement, PrimaryKey,
  Sequelize, DataType, AllowNull, Scopes, HasMany
} from 'sequelize-typescript';
import { Address } from './Address';
import { ClientContact } from './ClientContact';


@Scopes(() => ({
  full: {
    attributes: {
      exclude: ['updated_at', 'created_at']
    },
    include: [{
      attributes: {
        exclude: ['updated_at', 'created_at']
      },
      model: ClientContact,
      include: [{
        model: Address
      }]
    }, {
      model: Address
    }]
    /* include: [{
      attributes: ['min_email_contacts', 'min_sms_contacts', 'min_letter_contacts', 'action_delay'],
      model: CaseTypeSla
    },
    {
      model: Mode,
      through: { attributes: [] }
    },
    {
      model: Strategy,
      through: { attributes: [] }
    }] */
  }
}))


@Table({ tableName: 'client' })
export class Client extends Model<Client> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id: number;

  @AllowNull(false)
  @Column
  business_name: string;

  @AllowNull(false)
  @Column
  trading_name: string;

  @AllowNull(false)
  @Column(DataType.ENUM("Limited", "Sole Trader", "Partnership Limited", "Club", "Charity"))
  business_type: string;

  @AllowNull(false)
  @Column
  company_registration_number: string;

  @Column
  mcc_code: string;

  @Column
  contract_end_date: Date;

  @Column
  years_in_business: number;

  @Column
  country: string;

  @Column
  vat_number: number;

  @Column
  date_of_incorporation: Date;

  @Column
  finance_status: string; // What is this

  @Column
  status: string;

  @Column
  sub_status: string;

  @Column
  status_date: Date;

  @Column
  sub_status_date: Date;

  @Default(Sequelize.fn('now'))
  @Column
  @CreatedAt
  created_at: Date;

  @Default(Sequelize.fn('now'))
  @Column
  @UpdatedAt
  updated_at: Date = new Date();

  @HasMany(() => ClientContact)
  clientContacts: [ClientContact];
  @HasMany(() => Address)
  addresses: [Address];
}

