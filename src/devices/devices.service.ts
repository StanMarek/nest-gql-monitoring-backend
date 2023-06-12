import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BaseService } from 'src/common/base.service';
import { CreateDeviceInput } from './dto/create-device.input';
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
  ) {
    super(deviceModel);
  }

  async create(createDeviceInput: CreateDeviceInput) {
    await this.validate(createDeviceInput);
    return this.deviceModel.create({
      serial: createDeviceInput.serial,
      latestVersion: createDeviceInput.version,
      currentVersion: createDeviceInput.version,
    });
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
}
