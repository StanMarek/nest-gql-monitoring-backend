import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationsModule } from 'src/locations/locations.module';
import { UsersModule } from 'src/users/users.module';
import { DevicesMessageService } from './devices-message.service';
import { DevicesResolver } from './devices.resolver';
import { DevicesService } from './devices.service';
import { Device, DeviceSchema } from './entities/device.entity';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    LocationsModule,
    MongooseModule.forFeatureAsync([
      { name: Device.name, useFactory: () => DeviceSchema },
    ]),
  ],
  providers: [DevicesResolver, DevicesService, DevicesMessageService],
  exports: [DevicesService, DevicesMessageService],
})
export class DevicesModule {}
