import { Module } from "@nestjs/common";
import { MedicinesService } from "./medicines.service";
import { MedicinesController } from "./medicines.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { MedicineType } from "../medicine_type/models/medicine_type.model";
import { Medicine } from "./models/medicine.model";

@Module({
  imports: [SequelizeModule.forFeature([Medicine, MedicineType])],

  controllers: [MedicinesController],
  providers: [MedicinesService],
})
export class MedicinesModule {}
