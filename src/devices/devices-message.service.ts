import { Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { Message } from 'src/common/types/message-type';
import { DevicesService } from './devices.service';

@Injectable()
export class DevicesMessageService {
  private mqttClient: mqtt.MqttClient;
  constructor(private readonly devicesService: DevicesService) {}

  setMqttClient(mqttClient: mqtt.MqttClient) {
    this.mqttClient = mqttClient;
  }

  async handleMessage(message: Message) {
    const device = await this.devicesService.findOneBySerial(message.device_id);
    this.mqttClient.publish(device.publishTopic, 'test');
  }
}
