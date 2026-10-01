import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { type Database } from 'src/db/database';
import { transfersTable } from 'src/db/schema';
import { walletTable } from 'drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class TransfersService {
  constructor(@Inject('Drizzle') private readonly db: Database) {}
  async createTransfer(userId: number, body: CreateTransferDto) {
    const newtrans = await this.db.transaction(async (tx) => {
      const findPayer = await this.db.query.usersTable.findFirst({
        where: { id: userId },
      });

      const findPayee = await this.db.query.usersTable.findFirst({
        where: { cpf: body.payeeCpf },
      });
      if (!findPayer) throw new NotFoundException('Nao achei o payer');
      if (!findPayee) throw new NotFoundException('Nao achei o payee');
      if (findPayee.id === userId) throw new BadRequestException();

      const findPayeeWallet = await tx.query.walletTable.findFirst({
        where: { userId: findPayee.id },
      });

      const findPayerWallet = await tx.query.walletTable.findFirst({
        where: { userId: findPayer.id },
      });

      if (!findPayeeWallet)
        throw new NotFoundException('Nao achei o payer wall');
      if (!findPayerWallet)
        throw new NotFoundException('Nao achei o payee wall');
      if (findPayerWallet.amount < body.amount) throw new BadRequestException();
      const newTransfer = await tx.insert(transfersTable).values({
        amount: body.amount,
        payerId: findPayer.id,
        payeeCpf: body.payeeCpf,
      });

      await tx
        .update(walletTable)
        .set({
          amount: findPayerWallet.amount - body.amount,
        })
        .where(eq(walletTable.userId, findPayer.id));

      await tx
        .update(walletTable)
        .set({
          amount: findPayeeWallet?.amount + body.amount,
        })
        .where(eq(walletTable.userId, findPayee.id));

      return newTransfer;
    });

    return newtrans;
  }
}
