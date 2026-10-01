import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PiggyService } from './piggy.service';
import { CreatePiggyDto } from './dto/create-piggy.dto';
import { UpdatePiggyDto } from './dto/update-piggy.dto';

@Controller('piggy')
export class PiggyController {
  constructor(private readonly piggyService: PiggyService) {}

  @Post()
  create(@Body() createPiggyDto: CreatePiggyDto) {
    return this.piggyService.create(createPiggyDto);
  }

  @Get()
  findAll() {
    return this.piggyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.piggyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePiggyDto: UpdatePiggyDto) {
    return this.piggyService.update(+id, updatePiggyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.piggyService.remove(+id);
  }
}
