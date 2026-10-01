import { Injectable } from '@nestjs/common';
import { CreatePiggyDto } from './dto/create-piggy.dto';
import { UpdatePiggyDto } from './dto/update-piggy.dto';

@Injectable()
export class PiggyService {
  create(createPiggyDto: CreatePiggyDto) {
    return 'This action adds a new piggy';
  }

  findAll() {
    return `This action returns all piggy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} piggy`;
  }

  update(id: number, updatePiggyDto: UpdatePiggyDto) {
    return `This action updates a #${id} piggy`;
  }

  remove(id: number) {
    return `This action removes a #${id} piggy`;
  }
}
