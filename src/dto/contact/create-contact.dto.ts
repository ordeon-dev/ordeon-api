import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  contactName: string;

  @IsArray()
  @IsNotEmpty()
  phone: string[];

  @IsString()
  @IsNotEmpty()
  email: string;
}
