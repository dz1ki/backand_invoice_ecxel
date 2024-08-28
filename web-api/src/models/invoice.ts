import { v4 as uuidv4 } from "uuid";
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Client } from "./client";

@Table({
  tableName: "invoice",
  timestamps: true,
  underscored: true,
})
export class Invoice extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: uuidv4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.ENUM("loading", "processing", "complete"),
    allowNull: false,
  })
  status: "loading" | "processing" | "complete";

  @Column({
    type: DataType.STRING(),
  })
  document: string;

  @ForeignKey(() => Client)
  @Column
  clientId: number;

  @BelongsTo(() => Client)
  client: Client;
}
