import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { CurrentUser } from '@nestjs/authentication';
import { type User } from 'src/db/schema';

@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Post('/pix')
  async create(@CurrentUser() user: User, @Body() body: CreateTransferDto) {
    return await this.transfersService.createTransfer(user.id, body);
  }
 
}
