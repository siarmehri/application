import {
  Table,
  Column,
  Model,
  Default,
  UpdatedAt,
  CreatedAt,
  ForeignKey,
  AutoIncrement,
  PrimaryKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Address } from './Address';
import { Client } from './Client';
import { EmailAddress } from './EmailAddress';
import { PhoneNumber } from './PhoneNumber';

@Table({ tableName: 'client_contact' })
export class ClientContact extends Model<ClientContact> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  title: string;

  @Column
  first_name: string;

  @Column
  last_name: string;

  @Column
  birth_date: Date;

  @Column
  nationality: string;

  @Column
  country_of_residence: string;

  @Column
  share_holding_percentage: number;

  @Column
  role: string;

  @Column
  place_of_birth: string;

  @Column
  is_signatory: boolean;

  @ForeignKey(() => Client)
  @Column
  client_id: number;

  @Column
  @CreatedAt
  created_at: Date;

  @Column
  @UpdatedAt
  updated_at: Date = new Date();

  @BelongsTo(() => Client)
  client: Client;

  @HasMany(() => Address)
  addresses: [Address];
  @HasMany(() => PhoneNumber)
  phonenumbers: [PhoneNumber];
  @HasMany(() => EmailAddress)
  emails: [EmailAddress];
}
