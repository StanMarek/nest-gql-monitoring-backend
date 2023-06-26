import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BaseService } from 'src/common/base.service';
import { DEFAULT_DEVICE_CONFIG } from 'src/constants';
import { User } from 'src/users/entities/user.entity';
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
  ) {
    super(deviceModel);
  }

  async create(createDeviceInput: CreateDeviceInput) {
    await this.validate(createDeviceInput);
    const publishTopic = `${this.configService.get<string>(
      'MQTT_PUBLISH_TOPIC',
    )}/${createDeviceInput.serial}/servertodevice`;
    return this.deviceModel.create({
      serial: createDeviceInput.serial,
      publishTopic,
      latestVersion: createDeviceInput.version,
      currentVersion: createDeviceInput.version,
      config: {
        ...DEFAULT_DEVICE_CONFIG,
        timestamp: new Date().getTime(),
      },
    });
  }

  findOneBySerial(serial: string) {
    return this.findOne({ serial });
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
    await this.findOne(filter);
    delete setDeviceConfigInput.id;

    return this.deviceModel.findOneAndUpdate(
      filter,
      {
        $set: {
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
}
