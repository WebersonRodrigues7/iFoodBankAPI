import { PartialType } from '@nestjs/mapped-types';
import { CreatePiggyDto } from './create-piggy.dto';

export class UpdatePiggyDto extends PartialType(CreatePiggyDto) {}
