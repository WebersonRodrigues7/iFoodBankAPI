import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTransferDto {
    @IsNumber()
    @IsNotEmpty()
    amount!: number

    @IsNotEmpty()
    @IsString()
    @MinLength(11)
    @MaxLength(11) 
    payeeCpf!: string
}
