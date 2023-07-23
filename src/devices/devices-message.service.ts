import { Injectable, Logger } from '@nestjs/common';
import { MqttClient } from '@nestjs/microservices/external/mqtt-client.interface';
import { compare } from 'semver';
import {
  HeartbeatMessageData,
  Message,
  ReportMessageData,
} from 'src/common/types/message-type';
import { LocationsService } from 'src/locations/locations.service';
import { castHeartbeatDataToEntity, castMessageDataToEntity } from 'src/util';
import { DevicesService } from './devices.service';

@Injectable()
export class DevicesMessageService {
  private mqttClient: MqttClient = null;
  private logger = new Logger(DevicesMessageService.name);

  constructor(
    private readonly devicesService: DevicesService,
    private readonly locationsService: LocationsService,
  ) {}

  setMqttClient(mqttClient: MqttClient) {
    this.mqttClient = mqttClient;
  }

  async handleIncomingMessage(message: Message) {
    this.logger.debug(`Received message from device: ${message.device_id}`);
    const device = await this.devicesService.findOneBySerial(message.device_id);
    console.log(message);

    if (device) {
      switch (message.message.type) {
        case 'signed_up':
          const updatedDevice =
            await this.devicesService.updateAfterReceivedMessage(
              { _id: device._id },
              { $set: { isActive: true } },
            );
          this.handleOutgoingMessage(device.publishTopic, {
            device_id: device.serial,
            message: {
              type: 'signed_up_ack',
              data: {
                signed_up: !!updatedDevice.isActive,
                protocol_ver: 1,
                config_id: device.config.timestamp,
              },
            },
          });
          break;

        case 'heartbeat':
          const diagnoscticsData = message.message.data as HeartbeatMessageData;
          const diagnostics = castHeartbeatDataToEntity(diagnoscticsData);
          await this.devicesService.updateAfterReceivedMessage(
            { _id: device._id },
            {
              $push: {
                diagnostics,
              },
            },
          );
          this.handleOutgoingMessage(device.publishTopic, {
            device_id: device.serial,
            message: {
              type: 'heartbeat_ack',
              data: {
                config_update_req:
                  device.config.timestamp > device.previousConfigTimestamp
                    ? 1
                    : 0,
                fw_update_req:
                  compare(device.latestVersion, device.currentVersion) > 0
                    ? 1
                    : 0,
              },
            },
          });
          break;

        case 'config_req':
          const configTimestamp = device.config.timestamp;
          delete device.config.timestamp;
          this.handleOutgoingMessage(device.publishTopic, {
            device_id: device.serial,
            message: {
              type: 'config',
              config_id: configTimestamp,
              data: device.config,
            },
          });
          break;

        case 'fw_req':
          this.handleOutgoingMessage(device.publishTopic, {
            device_id: device.serial,
            message: {
              type: 'fw_update',
              data: {
                FW: device.latestVersion,
                FW_md5: 'hex_md5',
                FW_uri: `http://TODO/firmware/${device.latestVersion}/fw.bin`, // TODO:
              },
            },
          });
          break;

        case 'shutdown':
          await this.devicesService.updateAfterReceivedMessage(
            { _id: device._id },
            { $set: { isActive: false } },
          );
          break;

        case 'testament':
          await this.devicesService.updateAfterReceivedMessage(
            { _id: device._id },
            { $set: { isActive: false } },
          );
          break;
        // TODO: implement alerts and reports
        case 'alert_start':
          break;
        case 'alert_stop':
          break;
        case 'report':
          const reportData = message.message.data as ReportMessageData;
          const report = castMessageDataToEntity(reportData, message.device_id);
          if (device.location) {
            await this.locationsService.updateAfterReceivedMessage(
              { _id: device.location },
              {
                $push: {
                  reports: report,
                },
              },
            );
          }
          break;
        default:
          break;
      }
      this.logger.debug(`Message handled`);
    } else {
      this.logger.debug(`Device not found`);
    }
  }

  private handleOutgoingMessage(topic: string, message: object) {
    this.logger.debug(`Sending message to topic: ${topic}`);
    console.log(topic, message);
    // this.mqttClient.publish(topic, JSON.stringify(message));
  }
}
