import { IsNumber, IsNotEmpty, IsBoolean, IsArray } from 'class-validator';
import { OrderProduct, OrderVehicle } from 'src/entities/os/os.entity';

export class CreateOsDto {
  @IsNotEmpty()
  @IsNumber()
  clientId: number;

  @IsNotEmpty()
  @IsNumber()
  statusId: number;

  @IsNotEmpty()
  @IsNumber()
  orgId: number;

  @IsNotEmpty()
  @IsArray()
  products: OrderProduct[];

  @IsNotEmpty()
  @IsArray()
  vehicles: OrderVehicle[];
}
