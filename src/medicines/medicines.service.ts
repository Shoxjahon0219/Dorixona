import { Injectable } from "@nestjs/common";
import { CreateMedicineDto } from "./dto/create-medicine.dto";
import { UpdateMedicineDto } from "./dto/update-medicine.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Medicine } from "./models/medicine.model";

@Injectable()
export class MedicinesService {
  constructor(
    @InjectModel(Medicine) private readonly medicineModel: typeof Medicine
  ) {}
  create(createMedicineDto: CreateMedicineDto): Promise<Medicine> {
    return this.medicineModel.create(createMedicineDto);
  }

  findAll(): Promise<Medicine[]> {
    return this.medicineModel.findAll();
  }

  async findOne(id: number): Promise<object | Medicine> {
    const medicine = await this.medicineModel.findOne({ where: { id } });
    if (!medicine) {
      return { message: `#${id} medicine does not exist.` };
    }
    return medicine;
  }

  async update(id: number, updateMedicineDto: UpdateMedicineDto) {
    const medicine = await this.medicineModel.findOne({ where: { id } });
    if (!medicine) {
      return { message: `#${id} medicine does not exist.` };
    }
    return this.medicineModel.update(updateMedicineDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const medicine = await this.medicineModel.findOne({ where: { id } });
    if (!medicine) {
      return { message: `#${id} medicine does not exist.` };
    }
    return this.medicineModel.destroy({ where: { id } });
  }
}
