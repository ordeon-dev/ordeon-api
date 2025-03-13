import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  type: boolean;

  @IsNumber()
  orgId: number;
}
