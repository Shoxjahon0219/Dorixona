import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './models/stock.model';
import { Pharmacy } from '../pharmacies/models/pharmacy.model';
import { Medicine } from '../medicines/models/medicine.model';

@Injectable()
export class StockService {
  constructor(
      @InjectModel(Stock) private readonly stockModel: typeof Stock,
      @InjectModel(Pharmacy) private readonly pharmacyModel: typeof Pharmacy,
      @InjectModel(Medicine) private readonly medicineModel: typeof Medicine
    ) {}

  async create(createStockDto: CreateStockDto): Promise<Stock> {
      const { pharmacyId, medicineId } = createStockDto;
      
      const pharmacy = await this.pharmacyModel.findByPk(pharmacyId);
      if (!pharmacy) {
        throw new NotFoundException(`#${pharmacyId} lik Pharmacy topilmadi`);
      }

      const medicine = await this.medicineModel.findByPk(medicineId);
      if (!medicine) {
        throw new NotFoundException(`#${medicineId} lik Medicine topilmadi`);
      }
      return this.stockModel.create(createStockDto);
    }
  
    findAll(): Promise<Stock[]> {
      return this.stockModel.findAll({ include: { all: true } });
    }
  
    async findOne(id: number): Promise<object | Stock> {
      const stock = await this.stockModel.findOne({
        where: { id },
        include: { all: true },
      });
      if (!stock) {
        throw new NotFoundException(`${id}lik Stock topilmadi`);
      }
      return stock;
    }
  
    async update(id: number, updateStockDto: UpdateStockDto) {
      const { pharmacyId, medicineId } = updateStockDto;
      if (pharmacyId) {
        const pharmacy = await this.pharmacyModel.findByPk(pharmacyId);
        if (!pharmacy) {
          throw new NotFoundException(`#${pharmacyId} lik Pharmacy topilmadi`);
        }
      }
      if (medicineId) {
        const medicine = await this.medicineModel.findByPk(medicineId);
        if (!medicine) {
          throw new NotFoundException(`#${medicineId} lik Medicine topilmadi`);
        }
      }
  
      const stock = await this.stockModel.findOne({ where: { id } });
      if (!stock) {
        throw new NotFoundException(`${id}lik Stock topilmadi`);
      }
      return this.stockModel.update(updateStockDto, {
        where: { id },
        returning: true,
      });
    }
  
    async remove(id: number) {
      const stock = await this.stockModel.findOne({ where: { id } });
      if (!stock) {
        throw new NotFoundException(`${id}lik Stock topilmadi`);
      }
      return this.stockModel.destroy({ where: { id } });
}
}