import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import {
  EmailVerificationService,
  Public,
  SignInService,
} from '@nestjs/authentication';
import { SignInDto, SignUpDto } from './dto/auth.dto';

import { CredentialsService } from './credentials.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly credentialService: CredentialsService,
    private readonly signInService: SignInService,
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @Public()
  @Post('/signUp')
  async singUp(@Body() body: SignUpDto) {
    const user = await this.credentialService.register(body);

    await this.emailVerificationService.send(user.user);

    return user;
  }

  @Public()
  @Post('/signIn')
  async singIn(@Body() body: SignInDto) {
    const user = await this.credentialService.verify(body);

    if (!user) {
      throw new UnauthorizedException('Email ou Senha inválido(s)');
    }

    const { session } = await this.signInService.signIn(`${user.id}`, {
      method: 'password',
    });

    return session;
  }
}
