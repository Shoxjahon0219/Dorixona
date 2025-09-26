import { Module } from "@nestjs/common";
import { RegionModule } from "./region/region.module";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { MedicineTypeModule } from "./medicine_type/medicine_type.module";
import { DistrictModule } from "./district/district.module";
import { MedicinesModule } from "./medicines/medicines.module";
import { PharmaciesModule } from "./pharmacies/pharmacies.module";
import { StockModule } from "./stock/stock.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      autoLoadModels: true,
      logging: false,
      synchronize: true,
    }),
    RegionModule,
    MedicineTypeModule,
    DistrictModule,
    MedicinesModule,
    PharmaciesModule,
    StockModule,
  ],
})
export class AppModule {}
