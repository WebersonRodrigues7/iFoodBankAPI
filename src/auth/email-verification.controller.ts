import {
  CurrentUser,
  EmailVerificationService,
  Public,
} from '@nestjs/authentication';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { type User } from 'src/db/schema';
@Controller('/auth/email')
export class EmailVerificationController {
  constructor(
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @Public()
  @Get('verify')
  async verify(@Query('token') token: string) {
    const verificado = await this.emailVerificationService.verify(token);

    if (!verificado) throw new BadRequestException('Link invalido ou expirado');

    return { email: verificado.email, emailVerified: true };
  }

  @Post('verification')
  async resendEmail(@CurrentUser() user: User) {
    if (user.emailVerified) {
      throw new ConflictException('Email ja verificado');
    }

    const userAccount = {
      id: String(user.id),
      email: user.email,
    };

    return await this.emailVerificationService.send(userAccount);
  }
}
