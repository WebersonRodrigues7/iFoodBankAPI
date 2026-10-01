import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PasswordHasher } from '@nestjs/authentication';
import { usersTable } from 'src/db/schema';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { eq } from 'drizzle-orm';
import { type Database } from 'src/db/database';

@Injectable()
export class CredentialsService {
  constructor(
    @Inject('Drizzle') private readonly db: Database,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async register(body: SignUpDto) {
    if (!body) {
      throw new BadRequestException();
    }
    const [findUser] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.cpf, body.cpf));
      
    if (findUser) {
      throw new ConflictException('Email já existe!');
    }

    const hashedPass = await this.passwordHasher.hash(body.password);

    const [newUser] = await this.db
      .insert(usersTable)
      .values({
        name: body.name,
        cpf: body.cpf,
        email: body.email,
        password: String(hashedPass),
      })
      .returning();

    return {
      user: {
        id: String(newUser.id),
        email: newUser.email,
      },
    };
  }

  async verify(body: SignInDto) {
    const [foundUser] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.cpf, body.cpf));

    if (!foundUser) throw new NotFoundException();

    const validPass = await this.passwordHasher.verify(
      body.password,
      foundUser.password,
    );
    if (!validPass) {
      return null;
    }

    return foundUser;
  }

  async resend(userEmail: string) {
    const user = await this.db.query.usersTable.findFirst({
      where: { email: userEmail }
    })
  
    if (!user) throw new NotFoundException('Enviamos um email!');
    
    return user;
  }
}
