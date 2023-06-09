import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { AllowRole } from 'src/auth/decorators/role.decorator';
import { GqlAuthGuard } from 'src/auth/guard/gql-auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Role, User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard, RoleGuard)
  @AllowRole(Role.ADMIN)
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @UseGuards(GqlAuthGuard, RoleGuard)
  @AllowRole(Role.ADMIN)
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @AllowRole(Role.ADMIN)
  @UseGuards(GqlAuthGuard, RoleGuard)
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: Types.ObjectId) {
    return this.usersService.findOne({ _id: id });
  }

  @UseGuards(GqlAuthGuard, RoleGuard)
  @AllowRole(Role.ADMIN)
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(
      { _id: updateUserInput.id },
      updateUserInput,
    );
  }

  @UseGuards(GqlAuthGuard, RoleGuard)
  @AllowRole(Role.ADMIN)
  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: Types.ObjectId) {
    return this.usersService.remove({ _id: id });
  }
}
