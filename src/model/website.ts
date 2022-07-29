import {
  Table, Column, Model, Default,
  UpdatedAt, CreatedAt, AutoIncrement, PrimaryKey,
  Sequelize, DataType, AllowNull, ForeignKey, BelongsTo
} from 'sequelize-typescript';
import { Transaction } from 'sequelize';
import { Client } from './Client';

export interface IWebsite {
  
  urls: string;
  client_id: string;

}

@Table({ tableName: 'website' })
export class Website extends Model<Website> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id: number;

  @Column
  urls: string;

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

  public static async SaveClient(
    websiteData: any,
    transaction: Transaction
  ) {
    try {
      return Promise.resolve(
        await Website.create(websiteData, { transaction: transaction })
      );
    } catch (err) {
      console.log((err as any).message);
    return Promise.reject(err);
    }
  }
  static async FindOne(websiteData: any, transaction: Transaction) {
    try {
      return Promise.resolve(
        await Website.findOne({
          where: {
            id: websiteData.client_id,
          },
          transaction: transaction,
        })
      );
    } catch (err) {
      return Promise.reject(err);
    }
  }
  public static async UpdateOrCreate(
    websiteData: any,
    transaction: Transaction
  ) {
    try {
      const website = await this.FindOne(websiteData, transaction);
      return !website
        ? Promise.resolve(await Website.SaveClient(websiteData, transaction))
        : Promise.resolve(
            Website.update(websiteData, {
              where: { id: websiteData.client_id },
              transaction: transaction,
            })
          );
    } catch (err) {
      return Promise.reject(err);
    }
  }

}


