import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/signin.input';
import { SignUpInput } from './dto/signup.input';
import { Authorization } from './entities/auth.entity';

@Resolver(() => Authorization)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Authorization)
  signIn(@Args('signIn') signIn: SignInInput) {
    return this.authService.signIn(signIn);
  }

  @Mutation(() => User)
  signUp(@Args('signUp') signUpInput: SignUpInput) {
    return this.authService.signUp(signUpInput);
  }
}
