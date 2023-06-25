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
import { Location } from 'src/locations/entities/location.entity';
import { LocationsService } from 'src/locations/locations.service';
import { Role, User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { DevicesService } from './devices.service';
import { CreateDeviceInput } from './dto/create-device.input';
import { SetDeviceConfigInput } from './dto/set-device-config.input';
import { UpdateDeviceInput } from './dto/update-device.input';
import { Device } from './entities/device.entity';

@UseInterceptors(UserInterceptor)
@Resolver(() => Device)
export class DevicesResolver {
  constructor(
    private readonly devicesService: DevicesService,
    private readonly usersService: UsersService,
    private readonly locationsService: LocationsService,
  ) {}

  @UseGuards(GqlAuthGuard, RoleGuard)
  @AllowRole(Role.ADMIN)
  @Mutation(() => Device)
  createDevice(
    @Args('createDeviceInput') createDeviceInput: CreateDeviceInput,
  ) {
    return this.devicesService.create(createDeviceInput);
  }

  @UseGuards(GqlAuthGuard, RoleGuard)
  @AllowRole(Role.CLIENT_ADMIN)
  @Query(() => [Device], { name: 'devices' })
  findAll(@GetUser() user: User) {
    if (user.role === Role.CLIENT_ADMIN) {
      return this.devicesService.findAll({ user });
    }
    return this.devicesService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Device, { name: 'device' })
  findOne(
    @GetUser() user: User,
    @Args('id', { type: () => String }) id: Types.ObjectId,
  ) {
    if (user.role === Role.CLIENT_ADMIN) {
      return this.devicesService.findOne({ _id: id, user });
    }
    return this.devicesService.findOne({ _id: id });
  }

  @UseGuards(GqlAuthGuard, RoleGuard)
  @AllowRole(Role.CLIENT_ADMIN)
  @Mutation(() => Device)
  updateDevice(
    @GetUser() user: User,
    @Args('updateDeviceInput') updateDeviceInput: UpdateDeviceInput,
  ) {
    return this.devicesService.update(
      { _id: updateDeviceInput.id, user },
      updateDeviceInput,
    );
  }

  @UseGuards(GqlAuthGuard, RoleGuard)
  @AllowRole(Role.CLIENT_ADMIN)
  @Mutation(() => Device)
  setDeviceConfig(
    @GetUser() user: User,
    @Args('setDeviceConfigInput') setDeviceConfigInput: SetDeviceConfigInput,
  ) {
    return this.devicesService.setConfig(
      { _id: setDeviceConfigInput.id, user },
      setDeviceConfigInput,
    );
  }

  @UseGuards(GqlAuthGuard, RoleGuard)
  @AllowRole(Role.CLIENT_ADMIN)
  @Mutation(() => Device)
  registerDevice(
    @GetUser() user: User,
    @Args('id', { type: () => String }) id: Types.ObjectId,
  ) {
    return this.devicesService.update({ _id: id, user }, { user });
  }

  @UseGuards(GqlAuthGuard, RoleGuard)
  @AllowRole(Role.ADMIN)
  @Mutation(() => Device)
  removeDevice(@Args('id', { type: () => String }) id: Types.ObjectId) {
    return this.devicesService.remove({ _id: id });
  }

  @ResolveField('user', () => User)
  async getDeviceUser(@Parent() device: Device) {
    const { user } = device;
    return this.usersService.findOne({ _id: user });
  }

  @ResolveField('location', () => Location)
  async getDeviceLocation(@Parent() device: Device) {
    const { location } = device;
    return this.locationsService.findOne({ _id: location });
  }
}
