import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  AuthenticationRegistry,
  EmailVerificationHandler,
  type EmailVerificationLink,
} from '@nestjs/authentication';
import { Mailer, type Mailable } from '@nestjs/mail';
import { usersTable } from 'drizzle/schema';
import { and, eq } from 'drizzle-orm';
import { UsersService } from 'src/users/users.service';
import { type Database } from 'src/db/database';

@Injectable()
export class VerifyEmailMail implements Mailable<EmailVerificationLink> {
  render({ url }: EmailVerificationLink) {
    return {
      subject: 'Confirme seu email',
      template: 'verify-email',
      context: { url },
    };
  }
}

@Injectable()
export class EmailVerificationMailer extends EmailVerificationHandler {
  constructor(
    @Inject('Drizzle') private readonly db: Database,
    private readonly usersService: UsersService,
    private readonly mailer: Mailer,
    registry: AuthenticationRegistry,
  ) {
    super();
    registry.registerHandler('emailVerification', this);
  }

  async send(link: EmailVerificationLink) {
    await this.mailer.send(VerifyEmailMail, { to: link.email, data: link });
  }

  async markVerified(userId: string, email: string) {
    const [user] = await this.db
      .select()
      .from(usersTable)
      .where(
        and(eq(usersTable.email, email), eq(usersTable.id, Number(userId))),
      );

    if (!user) throw new NotFoundException();
    return this.usersService.markVerifiedEmail(user.id, user.email);
  }
}
