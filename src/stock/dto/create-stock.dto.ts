import { IsNumber, IsPositive } from "class-validator";

export class CreateStockDto {
  @IsNumber()
  @IsPositive()
  pharmacyId: number;
  @IsNumber()
  @IsPositive()
  medicineId: number;
  @IsNumber()
  @IsPositive()
  quantity: number;
}
