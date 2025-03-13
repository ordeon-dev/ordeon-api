import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateVehicleDto {
  @IsString()
  name: string;

  @IsString()
  plate: string;

  @IsString()
  document: string;
}
