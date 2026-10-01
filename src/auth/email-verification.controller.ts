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
import { ResendEmailDto, SignUpDto } from './dto/auth.dto';
import { CredentialsService } from './credentials.service';
@Controller('/auth/email')
export class EmailVerificationController {
  constructor(
    private readonly emailVerificationService: EmailVerificationService,
    private readonly credentialsService: CredentialsService,
  ) {}

  @Public()
  @Get('verify')
  async verify(@Query('token') token: string) {
    const verificado = await this.emailVerificationService.verify(token);

    if (!verificado) throw new BadRequestException('Link invalido ou expirado');

    return { email: verificado.email, emailVerified: true };
  }

  @Public()
  @Post('verification')
  async resendEmail(@Body() body: ResendEmailDto) {
    const user = await this.credentialsService.resend(body.email);

    if (user.emailVerified) {
      throw new ConflictException('Email ja verificado');
    }

    if (!body.email) throw new BadRequestException('Coloque um email!');

    const userAccount = {
      id: String(user.id),
      email: body.email,
    };
    return await this.emailVerificationService.send(userAccount);
  }
}
