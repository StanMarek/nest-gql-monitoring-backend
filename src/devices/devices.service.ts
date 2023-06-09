import { Injectable } from '@nestjs/common';
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

  create(createDeviceInput: CreateDeviceInput) {
    return this.deviceModel.create({
      latestVersion: createDeviceInput.version,
      currentVersion: createDeviceInput.version,
    });
  }

  deleteMany(filter: FilterQuery<Device>) {
    return this.deviceModel.deleteMany(filter);
  }
}
