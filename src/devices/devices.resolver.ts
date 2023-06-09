import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { AllowRole } from 'src/auth/decorators/role.decorator';
import { GqlAuthGuard } from 'src/auth/guard/gql-auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/users/entities/user.entity';
import { DevicesService } from './devices.service';
import { CreateDeviceInput } from './dto/create-device.input';
import { UpdateDeviceInput } from './dto/update-device.input';
import { Device } from './entities/device.entity';

@Resolver(() => Device)
export class DevicesResolver {
  constructor(private readonly devicesService: DevicesService) {}

  @UseGuards(GqlAuthGuard, RoleGuard)
  @AllowRole(Role.ADMIN)
  @Mutation(() => Device)
  createDevice(
    @Args('createDeviceInput') createDeviceInput: CreateDeviceInput,
  ) {
    return this.devicesService.create(createDeviceInput);
  }

  @UseGuards(GqlAuthGuard, RoleGuard)
  @AllowRole(Role.ADMIN)
  @Query(() => [Device], { name: 'devices' })
  findAll() {
    return this.devicesService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Device, { name: 'device' })
  findOne(@Args('id', { type: () => String }) id: Types.ObjectId) {
    return this.devicesService.findOne({ _id: id });
  }

  @UseGuards(GqlAuthGuard, RoleGuard)
  @AllowRole(Role.CLIENT_ADMIN)
  @Mutation(() => Device)
  updateDevice(
    @Args('updateDeviceInput') updateDeviceInput: UpdateDeviceInput,
  ) {
    return this.devicesService.update(
      { _id: updateDeviceInput.id },
      updateDeviceInput,
    );
  }

  @UseGuards(GqlAuthGuard, RoleGuard)
  @AllowRole(Role.ADMIN)
  @Mutation(() => Device)
  removeDevice(@Args('id', { type: () => String }) id: Types.ObjectId) {
    return this.devicesService.remove({ _id: id });
  }
}
