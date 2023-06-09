import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { BaseService } from 'src/common/base.service';
import { DEFAULT_DEVICE_CONFIG } from 'src/constants';
import { LocationsService } from 'src/locations/locations.service';
import { User } from 'src/users/entities/user.entity';
import { AssignDeviceLocationInput } from './dto/assign-device-location.input';
import { CreateDeviceInput } from './dto/create-device.input';
import { SetDeviceConfigInput } from './dto/set-device-config.input';
import { UpdateDeviceInput } from './dto/update-device.input';
import { Device, DeviceDocument } from './entities/device.entity';

@Injectable()
export class DevicesService extends BaseService<
  Device,
  CreateDeviceInput,
  UpdateDeviceInput
> {
  constructor(
    @InjectModel(Device.name)
    private deviceModel: Model<DeviceDocument>,
    private readonly configService: ConfigService,
    private readonly locationsService: LocationsService,
  ) {
    super(deviceModel);
  }

  async create(createDeviceInput: CreateDeviceInput) {
    await this.validate(createDeviceInput);

    const publishTopic = `${this.configService.get<string>(
      'MQTT_PUBLISH_TOPIC',
    )}/${createDeviceInput.serial}/servertodevice`;
    const timestamp = new Date().getTime();

    return this.deviceModel.create({
      serial: createDeviceInput.serial,
      publishTopic,
      latestVersion: createDeviceInput.version,
      currentVersion: createDeviceInput.version,
      previousConfigTimestamp: timestamp,
      config: {
        ...DEFAULT_DEVICE_CONFIG,
        timestamp,
      },
    });
  }

  findOneBySerial(serial: string) {
    return this.deviceModel.findOne({ serial });
  }

  deleteMany(filter: FilterQuery<Device>) {
    return this.deviceModel.deleteMany(filter);
  }

  async validate(createDeviceInput: CreateDeviceInput) {
    const device = await this.deviceModel.findOne({
      $or: [{ serial: createDeviceInput.serial }],
    });

    if (device) {
      throw new BadRequestException(
        `Device with serial '${createDeviceInput.serial}' already exists`,
      );
    }
  }

  async setConfig(
    filter: FilterQuery<Device>,
    setDeviceConfigInput: SetDeviceConfigInput,
  ) {
    const device = await this.findOne(filter);
    delete setDeviceConfigInput.id;

    return this.deviceModel.findOneAndUpdate(
      filter,
      {
        $set: {
          previousConfigTimestamp: device.config.timestamp,
          config: { ...setDeviceConfigInput, timestamp: new Date().getTime() },
        },
      },
      {
        new: true,
      },
    );
  }

  async registerDevice(serial: string, user: User) {
    const device = await this.findOne({ serial });

    if (device.user) {
      throw new BadRequestException(
        `Device with serial '${serial}' already registered`,
      );
    }

    return this.update({ _id: device._id }, { user });
  }

  async assignLocation(
    assignDeviceLocationInput: AssignDeviceLocationInput,
    user: User,
  ) {
    const device = await this.findOne({
      _id: assignDeviceLocationInput.deviceId,
      user,
    });

    const location = await this.locationsService.findOne({
      _id: assignDeviceLocationInput.locationId,
      user,
    });

    if (!location) {
      throw new BadRequestException(
        `Location with id '${assignDeviceLocationInput.locationId}' not found`,
      );
    }

    return this.update({ _id: device._id }, { location });
  }

  async updateAfterReceivedMessage(
    filter: FilterQuery<DeviceDocument>,
    update: UpdateQuery<DeviceDocument>,
  ) {
    return this.deviceModel.findOneAndUpdate(filter, update, { new: true });
  }
}
