import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AdminService } from "../admin/admin.service";
import { JwtService } from "@nestjs/jwt";
import { Admin } from "../admin/models/admin.model";
import { SigninAdminDto } from "../admin/dto/signin-admin.dto";
import * as bcrypt from "bcrypt";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService
  ) {}

  private async generateToken(admin: Admin) {
    const payload = {
      id: admin.id,
      email: admin.email,
      isCreator: admin.isCreator,
    };

    return { token: this.jwtService.sign(payload) };
  }

  async signup(createAdminDto: CreateAdminDto) {
    const candidate = await this.adminService.findOneByEmail(
      createAdminDto.email
    );

    if (candidate) {
      throw new UnauthorizedException("Bunday foydalanuvchi mavjud");
    }

    const hashedPass = await bcrypt.hash(createAdminDto.password, 7);
    createAdminDto.password = hashedPass;

    const newAdmin = await this.adminService.create(createAdminDto);
    return newAdmin;
  }

  async signin(signinAdminDto: SigninAdminDto) {
    const admin = await this.adminService.findOneByEmail(signinAdminDto.email);

    if (!admin) {
      throw new UnauthorizedException("Email yoki password hato");
    }

    const verifyPassword = await bcrypt.compare(
      signinAdminDto.password,
      admin.password
    );

    if (!verifyPassword) {
      throw new UnauthorizedException("Email yoki password hato");
    }

    return this.generateToken(admin);
  }
}
