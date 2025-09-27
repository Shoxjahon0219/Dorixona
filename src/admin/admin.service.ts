import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private readonly adminModel: typeof Admin) {}

  create(createAdminDto: CreateAdminDto) {
    return this.adminModel.create({ ...createAdminDto, isCreator: false });
  }

  findAll() {
    return this.adminModel.findAll();
  }

  async findOneByEmail(email: string) {
    const admin = await this.adminModel.findOne({ where: { email } });
    return admin?.dataValues;
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findOne({ where: { id } });

    if (!admin) {
      throw new NotFoundException(`#${id}lik Admin topilmadi `);
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminModel.findOne({ where: { id } });

    if (!admin) {
      throw new NotFoundException(`#${id}lik Admin topilmadi `);
    }

    return this.adminModel.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const admin = await this.adminModel.findOne({ where: { id } });

    if (!admin) {
      throw new NotFoundException(`#${id}lik Admin topilmadi `);
    }

    return this.adminModel.destroy({ where: { id } });
  }
}
