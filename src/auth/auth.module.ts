import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { CredentialsService } from './credentials.service';
import { SessionAuth } from './sessionauth.service';
import { DatabaseModule } from 'src/db/database.module';
import { EmailVerificationMailer } from './email-verification.mailer';
import { EmailVerificationController } from './email-verification.controller';

@Module({
  imports: [UsersModule, DatabaseModule],
  controllers: [AuthController, EmailVerificationController],
  providers: [SessionAuth, CredentialsService, EmailVerificationMailer, UsersService],

})
export class AuthModule {}
