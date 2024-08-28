import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Invoice } from "./invoice";

@Table({
  tableName: "clients",
  timestamps: true,
  underscored: true,
})
export class Client extends Model {
  @Column({
    type: DataType.INTEGER(),
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @HasMany(() => Invoice)
  invoice: Invoice[];

  @Column({
    type: DataType.STRING(),
  })
  firstName: string;

  @Column({
    type: DataType.STRING(),
  })
  lastName: string;

  @Column({
    type: DataType.STRING(),
    unique: true,
    allowNull: true,
  })
  email: string;
}
