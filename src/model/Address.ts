import {
  Table, Column, Model, Default,
  UpdatedAt, CreatedAt, AutoIncrement, PrimaryKey,
  Sequelize, DataType, AllowNull, ForeignKey, BelongsTo
} from 'sequelize-typescript';
import { Client } from './Client';
import { ClientContact } from './ClientContact';
import { Transaction } from 'sequelize';

@Table({ tableName: 'address' })
export class Address extends Model<Address> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id: number;


  @Column(DataType.ENUM("primary", "secondary"))
  type: string;

  @Default('false')
  @Column
  is_primary: boolean;


  @Column
  address_line: string;


  @Column
  premises: string;

  @Column
  locality: string;

  @Column
  country: string;

  @Column
  post_code: number;

  @ForeignKey(() => Client)
  @Column
  client_id: number;

  @ForeignKey(() => ClientContact)
  @Column
  client_contact_id: number;

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

  @BelongsTo(() => ClientContact)
  client_contact: ClientContact;

  public static async Save(
    addressData: any,
    transaction: Transaction
  ) {
    try {
      return Promise.resolve(
        await Address.create(addressData, { transaction: transaction })
      );
    } catch (err) {
      console.log((err as any).message);
      return Promise.reject(err);
    }
  }
  static async FindOne(id: number, transaction: Transaction) {
    try {
      return Promise.resolve(
        await Address.findOne({
          where: {
            id: id,
          },
          transaction: transaction,
        })
      );
    } catch (err) {
      return Promise.reject(err);
    }
  }
  public static async UpdateOrCreate(
    addressData: any,
    transaction: Transaction
  ) {
    try {
      const address = (addressData.id) ? await this.FindOne(addressData.id, transaction) : null;
      if (!address) {
        return Promise.resolve(await Address.Save(addressData, transaction));
      } else {
        Promise.resolve(
          await Address.update(addressData, {
            where: { id: addressData.id },
            transaction: transaction,
          })
        );
        return Promise.resolve(await Address.FindOne(address.id, transaction));
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }








}


