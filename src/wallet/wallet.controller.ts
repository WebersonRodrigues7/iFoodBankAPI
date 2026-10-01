import { Body, Controller, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CurrentUser } from '@nestjs/authentication';
import { type User } from 'src/db/schema';
import { CreateWalletDto } from './dto/create-wallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
 
  @Post('/deposit')
  async addAmount(@CurrentUser() user: User, @Body() body: CreateWalletDto) {
    const depositInWallet = await this.walletService.deposit(user.id, body.amount);

    return depositInWallet;
  }
}
