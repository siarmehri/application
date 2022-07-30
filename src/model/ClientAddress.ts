import {
  Table, Column, Model, Default,
  UpdatedAt, CreatedAt,
  Sequelize, ForeignKey
} from 'sequelize-typescript';
import { Client } from './Client';
import { Address } from './Address';
import { Transaction } from 'sequelize';

@Table({ tableName: 'client_address' })
export class ClientAddress extends Model<ClientAddress> {
  @ForeignKey(() => Client)
  @Column
  client_id: number;

  @ForeignKey(() => Address)
  @Column
  address_id: number;

  @Default(Sequelize.fn('now'))
  @Column
  @CreatedAt
  created_at: Date;

  @Default(Sequelize.fn('now'))
  @Column
  @UpdatedAt
  updated_at: Date = new Date();

  public static async Save(
    client_id: number,
    address_id: number,
    transaction: Transaction
  ) {
    try {
      return Promise.resolve(
        await ClientAddress.create({client_id, address_id}, { transaction: transaction })
      );
    } catch (err) {
      console.log((err as any).message);
      return Promise.reject(err);
    }
  }

  static async FindOne(client_id: number, transaction: Transaction) {
    try {
      return Promise.resolve(
        await ClientAddress.findOne({
          where: {
            client_id
          },
          transaction: transaction,
        })
      );
    } catch (err) {
      return Promise.reject(err);
    }
  }
  public static async CreateOrReturn(
    client_id: number,
    address_id: number,
    transaction: Transaction
  ) {
    try {
      const clientAddress = await this.FindOne(client_id, transaction);
      if(!clientAddress) {
        return Promise.resolve(await ClientAddress.Save(client_id, address_id, transaction));
      } else {
        return Promise.resolve(clientAddress);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
}