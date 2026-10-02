import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { usersTable, walletTable } from 'drizzle/schema';
import { type Database } from 'src/db/database';

@Injectable()
export class WalletService {
  constructor(@Inject('Drizzle') private readonly db: Database) {}

  async createWallet(userId: number) {
    try {
      if (!userId) throw new NotFoundException();
      const [findWallet] = await this.db
        .select()
        .from(walletTable)
        .where(eq(walletTable.userId, userId));

      if (findWallet) return findWallet;

      const newWallet = await this.db.insert(walletTable).values({
        userId: userId,
        amount: 0,
      });

      return newWallet;
    } catch (err) {
      console.log('Deu erro aqui' + err);
    }
  }

  async deposit(userId: number, amount: number) {
    if (!userId) throw new NotFoundException();

    const [findWallet] = await this.db
      .select()
      .from(walletTable)
      .where(eq(walletTable.userId, userId));

    if (!findWallet) throw new NotFoundException();

    const [updtWallet] = await this.db
      .update(walletTable)
      .set({
        amount: findWallet.amount + Number(amount),
      })
      .where(eq(walletTable.userId, userId))
      .returning();

    return updtWallet;
  }

  async pix(payerId, payeeId, amount) {}
}
