import { Injectable } from "@nestjs/common";
import { CreateMedicineTypeDto } from "./dto/create-medicine_type.dto";
import { UpdateMedicineTypeDto } from "./dto/update-medicine_type.dto";
import { InjectModel } from "@nestjs/sequelize";
import { MedicineType } from "./models/medicine_type.model";

@Injectable()
export class MedicineTypeService {
  constructor(
    @InjectModel(MedicineType)
    private readonly medicineTypeModel: typeof MedicineType
  ) {}

  create(createMedicineTypeDto: CreateMedicineTypeDto): Promise<MedicineType> {
    return this.medicineTypeModel.create(createMedicineTypeDto);
  }

  findAll(): Promise<MedicineType[]> {
    return this.medicineTypeModel.findAll();
  }

  async findOne(id: number): Promise<object | MedicineType> {
    const medicineType = await this.medicineTypeModel.findOne({
      where: { id },
    });
    if (!medicineType) {
      return { message: `#${id} medicineType does not exist.` };
    }
    return medicineType;
  }

  async update(id: number, updateMedicineTypeDto: UpdateMedicineTypeDto) {
    const medicineType = await this.medicineTypeModel.findOne({
      where: { id },
    });
    if (!medicineType) {
      return { message: `#${id} medicineType does not exist.` };
    }
    return this.medicineTypeModel.update(updateMedicineTypeDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const medicineType = await this.medicineTypeModel.findOne({
      where: { id },
    });
    if (!medicineType) {
      return { message: `#${id} medicineType does not exist.` };
    }
    return this.medicineTypeModel.destroy({ where: { id } });
  }
}
