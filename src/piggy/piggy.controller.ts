import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PiggyService } from './piggy.service';
import { CreatePiggyDto } from './dto/create-piggy.dto';
import { CurrentUser } from '@nestjs/authentication';
import { type User } from 'src/db/schema';

@Controller('piggy')
export class PiggyController {
  constructor(private readonly piggyService: PiggyService) {}

  @Post()
  async create(@CurrentUser() user: User, @Body() body: CreatePiggyDto) {
    await this.piggyService.createPiggy(body, user.id);
  }

  @Post('/deposit')
  async deposit(@Body() body: CreatePiggyDto, @CurrentUser() user: User) {
    await this.piggyService.depositPiggy(body, user.id);
  }
  @Delete()
  async delete(@CurrentUser() user: User) {
    await this.piggyService.deletePiggy(user.id);
  }
}
