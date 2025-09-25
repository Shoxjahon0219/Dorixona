export class CreateMedicineDto {
  name: string;
  manufacturer: string;
  price: number;
  expiry_date: Date;
  info: string;
  medicineTypeId: number;
}
