import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Region } from "../../region/models/region.model";
import { District } from "../../district/models/district.model";
import { Medicine } from "../../medicines/models/medicine.model";
import { Stock } from "../../stock/models/stock.model";

interface IPharmacyCreationAttr {
  name: string;
  address: string;
  location: string;
  phone: string;
  email: string;
  regionId: number;
  districtId: number;
}

@Table({ tableName: "pharmacies", timestamps: false })
export class Pharmacy extends Model<Pharmacy, IPharmacyCreationAttr> {
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
  declare address: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare location: string;

  @Column({
    type: DataType.STRING(15),
    allowNull: false,
  })
  declare phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare email: string;

  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  declare regionId: number;

  @BelongsTo(() => Region)
  region: Region;

  @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
  })
  declare districtId: number;

  @BelongsTo(() => District)
  district: District;

  @BelongsToMany(() => Medicine, () => Stock)
  medicines: Medicine[];
}
