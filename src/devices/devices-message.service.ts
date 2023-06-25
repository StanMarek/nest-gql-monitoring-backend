import { Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { Message } from 'src/common/types/message-type';
import { DevicesService } from './devices.service';

@Injectable()
export class DevicesMessageService {
  private mqttClient: mqtt.MqttClient = null;
  constructor(private readonly devicesService: DevicesService) {}

  setMqttClient(mqttClient: mqtt.MqttClient) {
    this.mqttClient = mqttClient;
  }

  async handleMessage(message: Message) {
    const device = await this.devicesService.findOneBySerial(message.device_id);
    console.log(message);
    // this.mqttClient.publish(device.publishTopic, 'test');
  }
}
