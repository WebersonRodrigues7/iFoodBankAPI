import {
  AuthenticationRegistry,
  SessionCookieProvider,
  type SessionRecord,
} from '@nestjs/authentication';
import { type User, usersTable } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { Inject, Injectable } from '@nestjs/common';
import { type Database } from 'src/db/database.js';

@Injectable()
export class SessionAuth extends SessionCookieProvider<User> {
  constructor(
    @Inject('Drizzle') private readonly db: Database,
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
