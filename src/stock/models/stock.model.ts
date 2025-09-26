import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Pharmacy } from "../../pharmacies/models/pharmacy.model";
import { Medicine } from "../../medicines/models/medicine.model";

interface IStockCreationAttr {
  pharmacyId: number;
  medicineId: number;
  quantity: number;
}

@Table({ tableName: "stock", timestamps: false })
export class Stock extends Model<Stock, IStockCreationAttr> {
  @ForeignKey(() => Pharmacy)
  @Column({
    type: DataType.INTEGER,
  })
  declare pharmacyId: number;

  @ForeignKey(() => Medicine)
  @Column({
    type: DataType.INTEGER,
  })
  declare medicineId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare quantity: number;

  @BelongsTo(() => Medicine)
  medicines: Medicine[];

  @BelongsTo(() => Pharmacy)
  pharmacies: Pharmacy[];
}
