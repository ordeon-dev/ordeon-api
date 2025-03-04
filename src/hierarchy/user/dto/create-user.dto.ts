import { IsNotEmpty, IsString, IsEmail, IsInt, IsOptional, IsNumber, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
  
  @IsNotEmpty()
  @IsArray()
  groups: number[];
  
  @IsOptional()
  @IsNumber()
  orgId?: number;
} 