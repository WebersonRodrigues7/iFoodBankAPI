import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePiggyDto } from './dto/create-piggy.dto';
import { type Database } from 'src/db/database';
import { piggyTable, usersTable, walletTable } from 'drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class PiggyService {
  constructor(@Inject('Drizzle') private readonly db: Database) {}

  async createPiggy(body: CreatePiggyDto, ownerId: number) {
    const findPiggy = await this.db.query.piggyTable.findFirst({
      where: { ownerId: ownerId },
    });

    if (findPiggy) return findPiggy;

    const [newPiggy] = await this.db
      .insert(piggyTable)
      .values({
        name: body.name,
        ownerId: ownerId,
        amount: body.amount,
      })
      .returning();

    return newPiggy;
  }

  async deletePiggy(userId: number) {
    const deletedPiggy = await this.db.transaction(async (tx) => {
      const findUser = await tx.query.usersTable.findFirst({
        where: { id: userId },
      });

      const findWalletUser = await tx.query.walletTable.findFirst({
        where: { userId: userId },
      });

      if (!findUser || !findWalletUser) throw new NotFoundException();

      const findPiggy = await tx.query.piggyTable.findFirst({
        where: { ownerId: findUser.id },
      });

      if (!findPiggy) throw new NotFoundException();

      const [deletedPiggy] = await tx
        .delete(piggyTable)
        .where(eq(piggyTable.ownerId, userId))
        .returning();

      await tx
        .update(walletTable)
        .set({
          amount: findWalletUser?.amount + findPiggy?.amount,
        })
        .where(eq(walletTable.userId, userId));

      return deletedPiggy;
    });

    return deletedPiggy.id;
  }

  async depositPiggy(body: CreatePiggyDto, userId: number) {
    const findPiggy = await this.db.query.piggyTable.findFirst({
      where: { ownerId: userId },
    });

    if (!findPiggy) return this.createPiggy(body, userId);

    const transaction = await this.db.transaction(async (tx) => {
      const findWallet = await tx.query.walletTable.findFirst({
        where: { userId: userId },
      });

      const user = await tx.query.usersTable.findFirst({
        where: { id: userId },
      });

      if (!findWallet || !user) throw new NotFoundException();

      if (body.amount > findWallet.amount) throw new BadRequestException();
      await tx
        .update(piggyTable)
        .set({
          amount: findPiggy.amount + body.amount,
        })
        .where(eq(piggyTable.ownerId, userId));

      await tx
        .update(walletTable)
        .set({
          amount: findWallet.amount - body.amount,
        })
        .where(eq(walletTable.userId, userId));
    });

    return transaction;
  }
}
