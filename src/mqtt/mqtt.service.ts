import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mqtt from 'mqtt';
import { Message } from 'src/common/types/message-type';
import { DevicesMessageService } from 'src/devices/devices-message.service';

@Injectable()
export class MqttService implements OnModuleInit {
  private mqttClient: mqtt.MqttClient;
  private logger = new Logger(MqttService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly deviceMessageService: DevicesMessageService,
  ) {}

  onModuleInit() {
    const host = this.configService.get<string>('MQTT_HOST');
    const port = this.configService.get<number>('MQTT_PORT');
    const password = this.configService.get<string>('MQTT_PASSWORD');
    const username = this.configService.get<string>('MQTT_USERNAME');
    const subscribeTopic = this.configService.get<string>(
      'MQTT_SUBSCRIBE_TOPIC',
    );
    const mqttUrl = `mqtt://${host}:${port}`;

    this.mqttClient = mqtt.connect(mqttUrl, {
      username,
      password,
    });

    this.mqttClient.on('connect', () => {
      this.logger.debug(`Connected to ${mqttUrl}`);
      this.mqttClient.subscribe(subscribeTopic, (err) => {
        if (!err) {
          this.logger.debug(`Subscribed to ${subscribeTopic}`);
        }
      });
    });

    this.deviceMessageService.setMqttClient(this.mqttClient);

    this.mqttClient.on('message', (topic, message) => {
      this.logger.debug(`Received message from topic: ${topic}`);
      this.handleMessage(message);
    });

    this.mqttClient.on('error', () => {
      this.logger.debug(`Error in connecting to ${mqttUrl}`);
    });
  }

  handleMessage(message: Buffer) {
    const messageString = message.toString();
    const messageJson: Message = JSON.parse(messageString);
    this.deviceMessageService.handleIncomingMessage(messageJson);
  }
}
