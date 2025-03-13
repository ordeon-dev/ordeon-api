import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  cpf_cnpj: string;

  @IsNotEmpty()
  @IsString()
  rg: string;

  @IsNotEmpty()
  @IsString()
  cnh: string;

  @IsBoolean()
  status: boolean;

  @IsNumber()
  orgId: number;
}
