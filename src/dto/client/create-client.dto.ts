import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsNumber,
} from 'class-validator';

// export class CreateClientDto {
//   @IsString()
//   name: string;

//   @IsNotEmpty()
//   @IsEmail()
//   email: string;

//   contact: contact[];

//   identity: identity;

//   address: address;
// }

// enum ContactType {
//   PERSONAL = 'PERSONAL',
//   BUSINESS = 'BUSINESS',
// }

// export interface contact {
//   id: string;
//   type: ContactType;
//   value: string;
// }

// enum IdentityType {
//   CPF = 'CPF',
//   CNPJ = 'CNPJ',
//   RG = 'RG',
//   CNH = 'CNH',
// }

// export interface identity {
//   id: string;
//   document: string;
//   type: IdentityType;
// }

// export interface address {
//   id: string;
//   street: string;
//   number: string;
//   city: string;
//   state: string;
//   country: string;
//   zipCode: string;
//   complement?: string;
// }

export class CreateClientDto {
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
