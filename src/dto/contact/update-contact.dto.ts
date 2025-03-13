import { IsString, IsArray } from 'class-validator';

export class UpdateContactDto {
  @IsString()
  contactName: string;

  @IsArray()
  phone: string[];

  @IsString()
  email: string;
}
