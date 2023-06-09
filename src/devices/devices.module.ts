import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesResolver } from './devices.resolver';
import { DevicesService } from './devices.service';
import { Device, DeviceSchema } from './entities/device.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: Device.name, useFactory: () => DeviceSchema },
    ]),
  ],
  providers: [DevicesResolver, DevicesService],
  exports: [DevicesService],
})
export class DevicesModule {}
