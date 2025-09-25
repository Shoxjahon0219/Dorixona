import { Injectable } from "@nestjs/common";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { InjectModel } from "@nestjs/sequelize";
import { District } from "./models/district.model";

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District) private readonly districtModel: typeof District
  ) {}

  create(createDistrictDto: CreateDistrictDto): Promise<District> {
    return this.districtModel.create(createDistrictDto);
  }

  findAll(): Promise<District[]> {
    return this.districtModel.findAll();
  }

  async findOne(id: number): Promise<object | District> {
    const district = await this.districtModel.findOne({ where: { id } });
    if (!district) {
      return { message: `#${id} district does not exist.` };
    }
    return district;
  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto) {
    const district = await this.districtModel.findOne({ where: { id } });
    if (!district) {
      return { message: `#${id} district does not exist.` };
    }
    return this.districtModel.update(updateDistrictDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const district = await this.districtModel.findOne({ where: { id } });
    if (!district) {
      return { message: `#${id} district does not exist.` };
    }
    return this.districtModel.destroy({ where: { id } });
  }
}
