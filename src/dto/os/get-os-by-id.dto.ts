import { IsNumber } from 'class-validator';

export class GetOsByIdDto {
  @IsNumber()
  orderId: number;
}
