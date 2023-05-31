import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from 'src/users/entities/user.entity';
import { ROLE_KEY } from '../decorators/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const lowestAllowRole = this.reflector.getAllAndOverride<Role>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const ctx = GqlExecutionContext.create(context);
    console.log('roles: ', lowestAllowRole);
    // console.log('context: ', context.switchToHttp().getRequest());
    console.log('gqlContext: ', ctx.getContext().req);

    if (!lowestAllowRole) {
      return true;
    }
    const role: Role = ctx.getContext().req.user.role;

    return role >= lowestAllowRole;
  }
}
