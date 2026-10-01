import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name!: string;

  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  cpf!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password!: string;
}

export class SignInDto {
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  cpf!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}

export class ResendEmailDto{
  @IsNotEmpty()
  @IsEmail()
  email!: string
}
