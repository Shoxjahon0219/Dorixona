import { Module } from "@nestjs/common";
import { StockService } from "./stock.service";
import { StockController } from "./stock.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Stock } from "./models/stock.model";
import { Pharmacy } from "../pharmacies/models/pharmacy.model";
import { Medicine } from "../medicines/models/medicine.model";

@Module({
  imports: [SequelizeModule.forFeature([Stock, Pharmacy, Medicine])],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
