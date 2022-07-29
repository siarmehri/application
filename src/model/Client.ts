import {
  Table,
  Column,
  Model,
  Default,
  UpdatedAt,
  CreatedAt,
  AutoIncrement,
  PrimaryKey,
  Sequelize,
  DataType,
  AllowNull,
  Scopes,
  HasMany,
} from 'sequelize-typescript';
import { Transaction } from 'sequelize';
import { Address } from './Address';
import { ClientContact } from './ClientContact';
import { EmailAddress } from './EmailAddress';
import { PhoneNumber } from './PhoneNumber';
import { Website } from './website';

export interface IClient {
  id: number;
  business_name: string;
  trading_name: string;
  business_type: string;
  company_registration_number: string;
  country: string;
}

@Scopes(() => ({
  full: {
    attributes: {
      exclude: ['updated_at', 'created_at'],
    },
    include: [
      {
        attributes: {
          exclude: ['updated_at', 'created_at'],
        },
        model: ClientContact,
        include: [
          {
            attributes: {
              exclude: ['updated_at', 'created_at'],
            },
            model: Address,
          },
          {
            attributes: {
              exclude: ['updated_at', 'created_at'],
            },
            model: PhoneNumber,
          },
          {
            attributes: {
              exclude: ['updated_at', 'created_at'],
            },
            model: EmailAddress,
          },
        ],
      },
      {
        attributes: {
          exclude: ['updated_at', 'created_at'],
        },

        model: Address,
      },
      {
        attributes: {
          exclude: ['updated_at', 'created_at', 'client_contact_id'],
        },
        model: PhoneNumber,
      },
      {
        attributes: {
          exclude: ['updated_at', 'created_at', 'client_contact_id'],
        },
        model: EmailAddress,
      },
      {
        attributes: {
          exclude: ['updated_at', 'created_at'],
        },
        model: Website,
      },
    ],
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
  },
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
  @Column(
    DataType.ENUM(
      'Limited',
      'Sole Trader',
      'Partnership Limited',
      'Club',
      'Charity'
    )
  )
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
  clientContacts: ClientContact[];

  @HasMany(() => Address)
  addresses: Address[];

  @HasMany(() => PhoneNumber)
  phoneNumbers: PhoneNumber[];

  @HasMany(() => EmailAddress)
  emails: EmailAddress[];

  @HasMany(() => Website)
  websites: Website[];

  // Ashraf Khan please create IClient interfaces to make your life easier.
  public static async SaveClient(
    clientData: IClient,
    transaction: Transaction
  ) {
    try {
      return Promise.resolve(
        await Client.create(clientData, { transaction: transaction })
      );
    } catch (err) {
      console.log((err as any).message);
      return Promise.reject(err);
    }
  }
  static async FindOne(clientData: IClient, transaction: Transaction) {
    try {
      return Promise.resolve(
        await Client.findOne({
          where: {
            id: clientData.id,
          },
          transaction: transaction,
        })
      );
    } catch (err) {
      return Promise.reject(err);
    }
  }
  public static async UpdateOrCreate(
    clientData: IClient,
    transaction: Transaction
  ) {
    try {
      const client = await this.FindOne(clientData, transaction);
      return !client
        ? Promise.resolve(await Client.SaveClient(clientData, transaction))
        : Promise.resolve(
            Client.update(clientData, {
              where: { id: clientData.id },
              transaction: transaction,
            })
          );
    } catch (err) {
     
      return Promise.reject(err);
    }
  }
}
