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

    if (!lowestAllowRole) {
      return true;
    }

    const role: Role = ctx.getContext().req.user.role;

    const MAP_USER_ROLES = {
      CLIENT_USER: 0,
      CLIENT_ADMIN: 1,
      ADMIN: 2,
    };

    return MAP_USER_ROLES[role] >= MAP_USER_ROLES[lowestAllowRole];
  }
}
