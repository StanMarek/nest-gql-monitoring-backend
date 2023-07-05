import { registerAs } from '@nestjs/config';
import { ClientProvider, Transport } from '@nestjs/microservices';

export default registerAs(
  'mqtt',
  (): ClientProvider => ({
    transport: Transport.MQTT,
    options: {
      host: process.env.MQTT_HOST,
      username: process.env.MQTT_USERNAME,
      port: parseInt(process.env.MQTT_PORT),
      url: `mqtt://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`,
      password: process.env.MQTT_PASSWORD,
    },
  }),
);
