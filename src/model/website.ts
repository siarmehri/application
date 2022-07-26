import {
  Table, Column, Model, Default,
  UpdatedAt, CreatedAt, AutoIncrement, PrimaryKey,
  Sequelize, DataType, AllowNull, ForeignKey, BelongsTo
} from 'sequelize-typescript';
import { Client } from './Client';


@Table({ tableName: 'website' })
export class Website extends Model<Website> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id: number;

  @Column
  url: string;

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


