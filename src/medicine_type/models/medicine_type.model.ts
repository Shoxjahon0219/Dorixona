import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Medicine } from "../../medicines/models/medicine.model";

interface IMedicine_typeCreationAttr {
  name: string;
}

@Table({
  tableName: "medicine_type",
  timestamps: false,
})
export class MedicineType extends Model<
  MedicineType,
  IMedicine_typeCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    unique: true,
    allowNull: false,
  })
  declare name: string;

  @HasMany(() => Medicine)
  district: Medicine;
}
