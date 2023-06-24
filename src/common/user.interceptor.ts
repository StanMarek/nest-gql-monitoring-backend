import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const foundUser = await this.usersService.findOne({
      _id: user.sub,
    });
    if (!foundUser) {
      throw new NotFoundException('Could not find a user on the database');
    }

    ctx.getContext().req.user = foundUser;
    return next.handle();
  }
}
