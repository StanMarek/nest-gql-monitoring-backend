import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ErrorsMessages } from 'src/constants';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { SignInInput } from './dto/signin.input';
import { SignUpInput } from './dto/signup.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signUp(signUpInput: SignUpInput) {
    const { phone, email, password1, password2, ...rest } = signUpInput;

    await this.usersService.userIsUnique(phone, email);

    if (password1 !== password2) {
      throw new BadRequestException(ErrorsMessages.PASSWORD_ERROR);
    }

    const hash = await bcrypt.hash(password1, 10);

    return this.usersService.create({ ...rest, password: hash, phone, email });
  }

  async signIn(signInInput: SignInInput) {
    const user = await this.usersService.findOne({ email: signInInput.email });

    if (!user) {
      throw new NotFoundException(ErrorsMessages.USER_NOT_FOUND);
    }

    return this.createAndGetJwtToken(user);
  }

  async createAndGetJwtToken(user: User) {
    const expiresIn = +this.configService.get<number>(
      'auth.jwt.signOptions.expiresIn',
    );

    const payload = { sub: user._id, role: user.role };

    return {
      token: this.jwtService.sign(payload, { expiresIn }),
      expiresIn,
    };
  }
}
