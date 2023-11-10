import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientMqtt } from '@nestjs/microservices';
import { MqttClient } from '@nestjs/microservices/external/mqtt-client.interface';
import { Message } from 'src/common/types/message-type';
import { DevicesMessageService } from 'src/devices/devices-message.service';

@Injectable()
export class MqttService implements OnModuleInit {
  private mqttClient: MqttClient;
  private logger = new Logger(MqttService.name);

  constructor(
    @Inject('MQTT_BROKER') private readonly mqttBroker: ClientMqtt,
    private readonly configService: ConfigService,
    private readonly deviceMessageService: DevicesMessageService,
  ) { }

  onModuleInit() {
    const subscribeTopic = this.configService.get<string>(
      'MQTT_SUBSCRIBE_TOPIC',
    );

    this.mqttClient = this.mqttBroker.createClient();
    this.mqttClient.on('connect', () => {
      if (this.mqttClient.connected) {
        this.logger.debug(`Connected to ${this.mqttClient.options.url}`);
        this.deviceMessageService.setMqttClient(this.mqttClient);
        this.mqttClient.subscribe(subscribeTopic, (err) => {
          if (!err) {
            this.logger.debug(`Subscribed to ${subscribeTopic}`);
          }
        });
      }
    });

    this.mqttClient.on('message', (topic, message) => {
      this.logger.debug(`Received message from topic: ${topic}`);
      this.handleMessage(message);
    });

    this.mqttClient.on('error', () => {
      this.logger.error(
        `Error in connecting to ${this.mqttClient.options.url}`,
      );
    });
  }

  handleMessage(message: Buffer) {
    try {
      const messageJson: Message = JSON.parse(message.toString());
      this.deviceMessageService.handleIncomingMessage(messageJson);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
