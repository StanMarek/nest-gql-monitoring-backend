import { IDeviceConfig } from './common/types/device-config';

export const Cookies = {
  JWT: 'cookie-jwt',
};

export enum ErrorsMessages {
  INVALID_ID = 'Invalid ObjectId',
  NAME_EXIST = 'With name already exist',
  NOT_FOUND = 'With this id not found',
  PASSWORD_ERROR = 'Passwords do not match',
  PIN_ERROR = 'Pins do not match',
  EMAIL_EXIST = 'User with this email already exist',
  PHONE_EXIST = 'User with this phone already exist',
  LOGIN_ERROR = 'Could not log-in with the provided credentials',
  USER_NOT_FOUND = 'User not found',
}

export const DEFAULT_DEVICE_CONFIG: Omit<IDeviceConfig, 'timestamp'> = {
  env: {
    env_hmax2: 100,
    env_hmax1: 100,
    env_alarm1_flag: 5,
    env_tmax1: 30,
    env_tmin1: 15,
    env_tmax2: 35,
    env_hmin2: 0,
    env_rap_limit: 5,
    env_ivl: 60,
    env_tmin2: 10,
    env_hmin1: 0,
  },
  mic: {
    mic_alarm1_flag: 3,
    mic_lvl2: 30,
    mic_lvl1: 20,
    mic_alarm2_flag: 5,
    mic_time2: 15,
    mic_time1: 10,
    mic_rap_limit: 5,
    mic_al1_set: 11233,
    mic_al1_flag: 5,
    mic_ivl: 3 * 60,
    mic_al2_flag: 667788,
  },
  light: {
    light_ivl: 3 * 60,
    light_rap_limit: 5,
  },
  move: {
    move_async_rep: 120,
    move_min_time: 10,
    move_ivl: 60,
    move_rap_limit: 5,
  },
  system: {
    led_light1: 30,
    buzz_vol1: 30,
    heartbeat_ivl: 300,
    pwr_mode: 0,
    buzz_vol2: 100,
    led_time1: 2,
    wifi_mode: 0,
    buzz_time1: 2,
    led_time2: 10,
    led_light2: 100,
    buzz_time2: 10,
  },
};
