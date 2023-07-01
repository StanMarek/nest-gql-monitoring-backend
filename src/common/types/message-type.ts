export interface Message {
  device_id: string;
  message: {
    type: MessageType;
    data: HeartbeatMessageData | any;
  };
}

export type MessageType =
  | 'signed_up'
  | 'heartbeat'
  | 'config_req'
  | 'fw_req'
  | 'shutdown'
  | 'testament'
  | 'alert_start'
  | 'alert_stop'
  | 'report';

export interface HeartbeatMessageData {
  bssid: string;
  rssi: number;
  uptime: number;
  con_uptime: number;
  config_id: number;
  error_flag: number;
  fw: string;
  mem_free: number;
  power_mode: number;
  temperature: number;
}

export type Heartbeat = Omit<
  HeartbeatMessageData,
  'con_uptime' | 'config_id' | 'error_flag' | 'mem_free' | 'power_mode'
> & {
  conUptime: number;
  configId: number;
  errorFlag: number;
  memFree: number;
  powerMode: number;
};
