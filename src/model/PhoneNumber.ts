import { 
  Table, Column, Model, Default,
  UpdatedAt, CreatedAt, AutoIncrement, PrimaryKey,
  Sequelize, DataType, AllowNull,ForeignKey,BelongsTo
} from 'sequelize-typescript';
import { Client } from './Client';
import { ClientContact } from './ClientContact';

@Table({ tableName: 'phone_number' })
export class PhoneNumber extends Model<PhoneNumber> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id: number;

 
  @Column(DataType.ENUM('private', 'localnumber', 'bussinesnumber'))
 type: string;

  @Column
  phone_number: string;

  @ForeignKey(() => Client)
  @Column
  client_id: number;

  @ForeignKey(() => ClientContact )
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
}


