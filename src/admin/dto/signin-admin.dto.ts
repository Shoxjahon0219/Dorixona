import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SigninAdminDto {
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
