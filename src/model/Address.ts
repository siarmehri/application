import { 
  Table, Column, Model, Default,
  UpdatedAt, CreatedAt, AutoIncrement, PrimaryKey,
  Sequelize, DataType, AllowNull,ForeignKey,BelongsTo
} from 'sequelize-typescript';
import { Client } from './Client';
import { ClientContact } from './ClientContact';

@Table({ tableName: 'address' })
export class Address extends Model<Address> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id: number;

  @AllowNull(false)
@Column(DataType.ENUM("primary","secondary"))
 type: string;

  @AllowNull(false)
  @Column
  is_primary: boolean;

  @AllowNull(false)
   @Column
  address_line: string;

  @AllowNull(false)
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


