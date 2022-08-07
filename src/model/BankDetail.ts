import {
  Table, Column, Model, Default,
  UpdatedAt, CreatedAt, AutoIncrement, PrimaryKey,
  Sequelize, DataType, AllowNull, ForeignKey, BelongsTo
} from 'sequelize-typescript';
import { Transaction } from 'sequelize';
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

 public static async Save(
    bankDetailData: any,
    transaction: Transaction
  ) {
    try {
      return Promise.resolve(
        await BankDetail.create(bankDetailData, { transaction: transaction })
      );
    } catch (err) {
      console.log((err as any).message);
      return Promise.reject(err);
    }
  }
  static async FindOne(client_id: number, transaction: Transaction) {
    try {
      return Promise.resolve(
        await BankDetail.findOne({
          where: {
            client_id:client_id
          },
          transaction: transaction,
        })
      );
    } catch (err) {
      return Promise.reject(err);
    }
  }
  public static async UpdateOrCreate(
   bankDetailData: any,
    transaction: Transaction
  ) {
    try {
      const bankDetail = (bankDetailData.client_id) ? await this.FindOne(bankDetailData.client_id, transaction): null;
      if(!bankDetail) {
        return Promise.resolve(await BankDetail.Save(bankDetailData, transaction));
      } else {
        Promise.resolve(
          BankDetail.update(bankDetailData, {
            where: {client_id: bankDetailData.client_id },
            transaction: transaction,
          })
        );

        return Promise.resolve(await this.FindOne(bankDetail.id, transaction));
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }



}


