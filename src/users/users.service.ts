import { Inject, Injectable } from '@nestjs/common';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { usersTable } from 'src/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(@Inject('Drizzle') private readonly db: BetterSQLite3Database) {}

  async deleteUser(id: number) {
    const [user] = await this.db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning({ deletedUser: usersTable.cpf });
    return user;
  }

  async markVerifiedEmail(id: number, email: string): Promise<boolean> {
    const [user] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user || user.email !== email) return false;

    await this.db
      .update(usersTable)
      .set({ emailVerified: true })
      .where(eq(usersTable.id, id));

    return true;
  }
}
