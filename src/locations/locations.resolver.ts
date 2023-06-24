import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Types } from 'mongoose';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AllowRole } from 'src/auth/decorators/role.decorator';
import { GqlAuthGuard } from 'src/auth/guard/gql-auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { UserInterceptor } from 'src/common/user.interceptor';
import { Role, User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import { Location } from './entities/location.entity';
import { LocationsService } from './locations.service';

@UseInterceptors(UserInterceptor)
@Resolver(() => Location)
export class LocationsResolver {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(GqlAuthGuard, RoleGuard)
  @AllowRole(Role.CLIENT_ADMIN)
  @Mutation(() => Location)
  createLocation(
    @GetUser() user: User,
    @Args('createLocationInput') createLocationInput: CreateLocationInput,
  ) {
    return this.locationsService.create({
      ...createLocationInput,
      user: user._id,
    });
  }

  @UseGuards(GqlAuthGuard, RoleGuard)
  @AllowRole(Role.CLIENT_ADMIN)
  @Query(() => [Location], { name: 'locations' })
  findAll(@GetUser() user: User) {
    return this.locationsService.findAll({ user });
  }

  @UseGuards(GqlAuthGuard, RoleGuard)
  @AllowRole(Role.CLIENT_ADMIN)
  @Query(() => Location, { name: 'location' })
  findOne(
    @GetUser() user: User,
    @Args('id', { type: () => String }) id: Types.ObjectId,
  ) {
    return this.locationsService.findOne({ _id: id, user });
  }

  @UseGuards(GqlAuthGuard, RoleGuard)
  @AllowRole(Role.CLIENT_ADMIN)
  @Mutation(() => Location)
  updateLocation(
    @GetUser() user: User,
    @Args('updateLocationInput') updateLocationInput: UpdateLocationInput,
  ) {
    return this.locationsService.update(
      { _id: updateLocationInput.id, user },
      updateLocationInput,
    );
  }

  @UseGuards(GqlAuthGuard, RoleGuard)
  @AllowRole(Role.CLIENT_ADMIN)
  @Mutation(() => Location)
  removeLocation(
    @GetUser() user: User,
    @Args('id', { type: () => String }) id: Types.ObjectId,
  ) {
    return this.locationsService.remove({ _id: id, user });
  }

  @ResolveField('user', () => User)
  async getLocationUser(@Parent() location: Location) {
    const { user } = location;
    return this.usersService.findOne({ _id: user });
  }
}
