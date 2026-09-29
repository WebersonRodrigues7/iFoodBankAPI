import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './db/database.module';
import { AuthModule } from './auth/auth.module.js';
import {
  FileTemplateEngine,
  LogMailTransport,
  MailModule,
  SmtpTransport,
} from '@nestjs/mail';
import { AuthenticationModule } from '@nestjs/authentication';
import { join } from 'node:path';
import { ConfigModule } from "@nestjs/config"
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailModule.forRootAsync({
      useFactory: () => ({
        transport: process.env.SMTP_HOST
          ? new SmtpTransport({ url: process.env.SMTP_HOST })
          : new LogMailTransport(),
        templates: new FileTemplateEngine({
          dir: join(__dirname, 'mail/templates'),
        }),
        from: '<webersongiovani@gmail.com>',
      }),
    }),
    AuthenticationModule.forRootAsync({
      useFactory: () => ({
        session: {
          absoluteTtl: '14d',
          idleTtl: '3d',
        },
        emailVerification: { url: `${process.env.APP_URL}/auth/email/verify`}
      }),
    }),
    UsersModule,
    DatabaseModule,
    AuthModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
