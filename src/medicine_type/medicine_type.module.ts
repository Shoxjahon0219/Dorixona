import { Module } from "@nestjs/common";
import { MedicineTypeService } from "./medicine_type.service";
import { MedicineTypeController } from "./medicine_type.controller";
import { MedicineType } from "./models/medicine_type.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { Medicine } from "../medicines/models/medicine.model";

@Module({
  imports: [SequelizeModule.forFeature([MedicineType, Medicine])],
  controllers: [MedicineTypeController],
  providers: [MedicineTypeService],
})
export class MedicineTypeModule {}
