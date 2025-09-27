import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  // @IsBoolean()
  // isCreator: boolean;  // BIRINCHI ADMIN DAN KEEN OLIB TASHLANADi
}
