import {
  AuthenticationRegistry,
  SessionCookieProvider,
  type SessionRecord,
} from '@nestjs/authentication';
import { type User, usersTable } from '../db/schema.js';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SessionAuth extends SessionCookieProvider<User> {
  constructor(
    @Inject('Drizzle') private readonly db: BetterSQLite3Database,
    registry: AuthenticationRegistry,
  ) {
    super();

    registry.registerProvider(this);
  }

  async validate(session: SessionRecord) {
    const [findUser] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, Number(session.userId)));
    return findUser;
  }
}
