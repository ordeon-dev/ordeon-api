import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';
import { OrderProduct } from 'src/entities/os/os.entity';
import { OrderVehicle } from 'src/entities/os/os.entity';

export class UpdateOsDto {
  @IsNumber()
  clientId: number;

  @IsNumber()
  statusId: number;

  @IsNumber()
  orgId: number;

  @IsArray()
  products: OrderProduct[];

  @IsArray()
  vehicles: OrderVehicle[];
}
