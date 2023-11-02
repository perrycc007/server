import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: any;

  @IsNotEmpty()
  @IsString()
  password: any;
}
