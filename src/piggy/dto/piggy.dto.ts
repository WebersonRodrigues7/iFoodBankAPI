import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePiggyDto {
    @IsNotEmpty()
    @IsString()
    name!: string

    @IsNotEmpty()
    @IsNumber()
    amount!: number
}


export class DepositPiggyDto {
    @IsNotEmpty()
    @IsNumber()
    amount!: number
}