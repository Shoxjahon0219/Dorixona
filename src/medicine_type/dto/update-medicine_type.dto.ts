import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicineTypeDto } from './create-medicine_type.dto';

export class UpdateMedicineTypeDto extends PartialType(CreateMedicineTypeDto) {}
