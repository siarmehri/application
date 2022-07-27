import {
  Table, Column, Model, Default,
  UpdatedAt, CreatedAt, AutoIncrement, PrimaryKey,
  Sequelize, DataType, AllowNull, ForeignKey, BelongsTo
} from 'sequelize-typescript';
import { Client } from './Client';
import { ClientContact } from './ClientContact';

@Table({ tableName: 'bank_detail' })
export class BankDetail extends Model<BankDetail> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id: number;


  @Column
  full_name: string;

  @Column
   bank_account_number: string;

  @Column
   sort_code: string;
   
  @Column
   bank_name: string;
   
  @Column
    iban: string;

  @ForeignKey(() => Client)
  @Column
  client_id: number;

  @Default(Sequelize.fn('now'))
  @Column
  @CreatedAt
  created_at: Date;

  @Default(Sequelize.fn('now'))
  @Column
  @UpdatedAt
  updated_at: Date = new Date();

  @BelongsTo(() => Client)
  client: Client;

}


