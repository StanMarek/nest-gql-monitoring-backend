import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DevicesModule } from 'src/devices/devices.module';
import { MqttService } from './mqtt.service';

@Module({
  providers: [MqttService],
  imports: [ConfigModule, DevicesModule],
})
export class MqttModule {}
