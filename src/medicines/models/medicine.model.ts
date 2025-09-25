import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { MedicineType } from "../../medicine_type/models/medicine_type.model";

interface IMedicineCreationAttr {
  name: string;
  manufacturer: string;
  price: number;
  expiry_date: Date;
  info: string;
  medicineTypeId: number;
}

@Table({ tableName: "medicine" })
export class Medicine extends Model<Medicine, IMedicineCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare manufacturer: string;

  @Column({
    type: DataType.DECIMAL(15, 2),
    allowNull: false,
  })
  declare price: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare expiry_date: Date;

  @Column({
    type: DataType.STRING,
  })
  declare info: string;

  @ForeignKey(() => MedicineType)
  @Column({
    type: DataType.INTEGER,
  })
  declare medicineTypeId: number;

  @BelongsTo(() => MedicineType)
  company: MedicineType;
}
