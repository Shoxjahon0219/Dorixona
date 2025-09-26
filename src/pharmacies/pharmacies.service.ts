import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePharmacyDto } from "./dto/create-pharmacy.dto";
import { UpdatePharmacyDto } from "./dto/update-pharmacy.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Pharmacy } from "./models/pharmacy.model";
import { Region } from "../region/models/region.model";
import { District } from "../district/models/district.model";

@Injectable()
export class PharmaciesService {
  constructor(
    @InjectModel(Pharmacy) private readonly pharmacyModel: typeof Pharmacy,
    @InjectModel(Region) private readonly regionModel: typeof Region,
    @InjectModel(District) private readonly districtModel: typeof District
  ) {}
  async create(createPharmacyDto: CreatePharmacyDto): Promise<Pharmacy> {
    const { regionId, districtId } = createPharmacyDto;
    const region = await this.regionModel.findByPk(regionId);
    const district = await this.districtModel.findByPk(districtId);

    if (!region) {
      throw new NotFoundException(`#${regionId} lik Region topilmadi`);
    }
    if (!district) {
      throw new NotFoundException(`#${districtId} lik District topilmadi`);
    }
    return this.pharmacyModel.create(createPharmacyDto);
  }

  findAll(): Promise<Pharmacy[]> {
    return this.pharmacyModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<object | Pharmacy> {
    const pharmacy = await this.pharmacyModel.findOne({
      where: { id },
      include: { all: true },
    });
    if (!pharmacy) {
      throw new NotFoundException(`${id}lik Pharmacy topilmadi`);
    }
    return pharmacy;
  }

  async update(id: number, updatePharmacyDto: UpdatePharmacyDto) {
    const { regionId, districtId } = updatePharmacyDto;
    if (regionId) {
      const region = await this.regionModel.findByPk(regionId);
      if (!region) {
        throw new NotFoundException(`#${regionId} lik Region topilmadi`);
      }
    }
    if (districtId) {
      const district = await this.districtModel.findByPk(districtId);
      if (!district) {
        throw new NotFoundException(`#${districtId} lik District topilmadi`);
      }
    }

    const pharmacy = await this.pharmacyModel.findOne({ where: { id } });
    if (!pharmacy) {
      throw new NotFoundException(`${id}lik Pharmacy topilmadi`);
    }
    return this.pharmacyModel.update(updatePharmacyDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const pharmacy = await this.pharmacyModel.findOne({ where: { id } });
    if (!pharmacy) {
      throw new NotFoundException(`${id}lik Pharmacy topilmadi`);
    }
    return this.pharmacyModel.destroy({ where: { id } });
  }
}
