import { IsString, IsBoolean, IsNumber } from 'class-validator';

export class UpdateClientDto {
  @IsString()
  name: string;

  @IsString()
  cpf_cnpj: string;

  @IsString()
  rg: string;

  @IsString()
  cnh: string;

  @IsBoolean()
  status: boolean;

  @IsNumber()
  orgId: number;
}
