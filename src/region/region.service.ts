import { Injectable } from "@nestjs/common";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Region } from "./models/region.model";

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region) private readonly regionModel: typeof Region
  ) {}

  create(createRegionDto: CreateRegionDto): Promise<Region> {
    return this.regionModel.create(createRegionDto);
  }

  findAll(): Promise<Region[]> {
    return this.regionModel.findAll();
  }

  async findOne(id: number): Promise<object | Region> {
    const region = await this.regionModel.findOne({ where: { id } });
    if (!region) {
      return { message: `#${id} region does not exist.` };
    }
    return region;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const region = await this.regionModel.findOne({ where: { id } });
    if (!region) {
      return { message: `#${id} region does not exist.` };
    }

    return this.regionModel.update(updateRegionDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const region = await this.regionModel.findOne({ where: { id } });
    if (!region) {
      return { message: `#${id} region does not exist.` };
    }
    return this.regionModel.destroy({ where: { id } });
  }
}
