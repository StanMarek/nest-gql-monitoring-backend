import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProvider, ClientsModule } from '@nestjs/microservices';
import mqttConfig from 'src/config/mqtt.config';
import { DevicesModule } from 'src/devices/devices.module';
import { MqttService } from './mqtt.service';

@Module({
  providers: [MqttService],
  imports: [
    ConfigModule,
    DevicesModule,
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule.forFeature(mqttConfig)],
        useFactory: async (configService: ConfigService) =>
          configService.get<ClientProvider>('mqtt'),
        name: 'MQTT_BROKER',
        inject: [ConfigService],
      },
    ]),
  ],
})
export class MqttModule {}
