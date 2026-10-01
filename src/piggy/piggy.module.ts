import { Module } from '@nestjs/common';
import { PiggyService } from './piggy.service';
import { PiggyController } from './piggy.controller';

@Module({
  controllers: [PiggyController],
  providers: [PiggyService],
})
export class PiggyModule {}
