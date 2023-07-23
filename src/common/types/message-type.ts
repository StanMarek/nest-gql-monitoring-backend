export interface Message {
  device_id: string;
  message: {
    type: MessageType;
    data: HeartbeatMessageData | ReportMessageData | AlertMessageData;
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
  date: Date;
};

export interface ReportMessageData {
  env: {
    h: number;
    t: number;
    havg: number;
    tavg: number;
    hmax: number;
    tmax: number;
    hmin: number;
    tmin: number;
  };
  mic: {
    alarm1_cnt: number;
    alarm2_cnt: number;
    alarm_al1_cnt: number;
    alarm_al2_cnt: number;
    avg_db: number;
    max_db: number;
    mic_tamer: number;
    noise_lvl_db: number;
  };
  pirsensor: {
    cnt: number;
    time: number;
  };
  light: {
    light: number;
  };
}

export interface ReportEnvironmentMessage {
  h: number;
  t: number;
  hAvg: number;
  tAvg: number;
  hMax: number;
  tMax: number;
  hMin: number;
  tMin: number;
}

export interface ReportMicMessage {
  alarm1Cnt: number;
  alarm2Cnt: number;
  alarmAl1Cnt: number;
  alarmAl2Cnt: number;
  avgDb: number;
  maxDb: number;
  micTamer: number;
  noiseLvlDb: number;
}

export interface ReportPirsensorMessage {
  cnt: number;
  time: number;
}

export interface ReportLightMessage {
  light: number;
}

export interface ReportMessage {
  environment: ReportEnvironmentMessage;
  mic: ReportMicMessage;
  pirsensor: ReportPirsensorMessage;
  lightsensor: ReportLightMessage;
  date: Date;
  device: string;
}

export interface AlertMicData {
  alert_lvl: number;
  db: number;
  limit: number;
}

export interface AlertMessageData {
  severity: number;
  mic?: AlertMicData;
}
