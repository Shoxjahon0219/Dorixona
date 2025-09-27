import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminCreationAttr {
  name: string;
  email: string;
  password: string;
  isCreator: boolean;
}

@Table({ tableName: "admin" })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(80),
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING(),
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare isCreator: boolean;
}
