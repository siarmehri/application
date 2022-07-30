import {
  Table, Column, Model, Default,
  UpdatedAt, CreatedAt,
  Sequelize, ForeignKey
} from 'sequelize-typescript';
import { Transaction } from 'sequelize';
import { Address } from './Address';
import { ClientContact } from './ClientContact';

@Table({ tableName: 'client_contact_address' })
export class ClientContactAddress extends Model<ClientContactAddress> {
  @ForeignKey(() => ClientContact)
  @Column
  client_contact_id: number;

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
    client_contact_id: number,
    address_id: number,
    transaction: Transaction
  ) {
    try {
      return Promise.resolve(
        await ClientContactAddress.create({client_contact_id, address_id}, { transaction: transaction })
      );
    } catch (err) {
      console.log((err as any).message);
      return Promise.reject(err);
    }
  }

  static async FindOne(client_contact_id: number, address_id: number, transaction: Transaction) {
    try {
      return Promise.resolve(
        await ClientContactAddress.findOne({
          where: {
            client_contact_id,
            address_id
          },
          transaction: transaction,
        })
      );
    } catch (err) {
      return Promise.reject(err);
    }
  }
  public static async CreateOrReturn(
    client_contact_id: number,
    address_id: number,
    transaction: Transaction
  ) {
    try {
      const clientAddress = await this.FindOne(client_contact_id, address_id, transaction);
      if(!clientAddress) {
        return Promise.resolve(await ClientContactAddress.Save(client_contact_id, address_id, transaction));
      } else {
        return Promise.resolve(clientAddress);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
}