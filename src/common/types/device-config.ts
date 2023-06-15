export interface Env {
  env_hmax2: number;
  env_hmax1: number;
  env_alarm1_flag: number;
  env_tmax1: number;
  env_tmin1: number;
  env_tmax2: number;
  env_hmin2: number;
  env_rap_limit: number;
  env_ivl: number;
  env_tmin2: number;
  env_hmin1: number;
}

export interface Mic {
  mic_alarm1_flag: number;
  mic_lvl2: number;
  mic_lvl1: number;
  mic_alarm2_flag: number;
  mic_time2: number;
  mic_time1: number;
  mic_rap_limit: number;
  mic_al1_set: number;
  mic_al1_flag: number;
  mic_ivl: number;
  mic_al2_flag: number;
}

export interface Light {
  light_ivl: number;
  light_rap_limit: number;
}

export interface Move {
  move_async_rep: number;
  move_min_time: number;
  move_ivl: number;
  move_rap_limit: number;
}

export interface System {
  led_light1: number;
  buzz_vol1: number;
  heartbeat_ivl: number;
  pwr_mode: number;
  buzz_vol2: number;
  led_time1: number;
  wifi_mode: number;
  buzz_time1: number;
  led_time2: number;
  led_light2: number;
  buzz_time2: number;
}

export interface IDeviceConfig {
  timestamp: number;
  env: Env;
  mic: Mic;
  light: Light;
  move: Move;
  system: System;
}
