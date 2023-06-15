import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
  Env,
  IDeviceConfig,
  Light,
  Mic,
  Move,
  System,
} from 'src/common/types/device-config';

@ObjectType()
export class EnvConfig implements Env {
  @Field(() => Int)
  env_hmax2: number;

  @Field(() => Int)
  env_hmax1: number;

  @Field(() => Int)
  env_alarm1_flag: number;

  @Field(() => Int)
  env_tmax1: number;

  @Field(() => Int)
  env_tmin1: number;

  @Field(() => Int)
  env_tmax2: number;

  @Field(() => Int)
  env_hmin2: number;

  @Field(() => Int)
  env_rap_limit: number;

  @Field(() => Int)
  env_ivl: number;

  @Field(() => Int)
  env_tmin2: number;

  @Field(() => Int)
  env_hmin1: number;
}

@ObjectType()
export class MicConfig implements Mic {
  @Field(() => Int)
  mic_alarm1_flag: number;

  @Field(() => Int)
  mic_lvl2: number;

  @Field(() => Int)
  mic_lvl1: number;

  @Field(() => Int)
  mic_alarm2_flag: number;

  @Field(() => Int)
  mic_time2: number;

  @Field(() => Int)
  mic_time1: number;

  @Field(() => Int)
  mic_rap_limit: number;

  @Field(() => Int)
  mic_al1_set: number;

  @Field(() => Int)
  mic_al1_flag: number;

  @Field(() => Int)
  mic_ivl: number;

  @Field(() => Int)
  mic_al2_flag: number;
}

@ObjectType()
export class LightConfig implements Light {
  @Field(() => Int)
  light_ivl: number;

  @Field(() => Int)
  light_rap_limit: number;
}

@ObjectType()
export class MoveConfig implements Move {
  @Field(() => Int)
  move_async_rep: number;

  @Field(() => Int)
  move_min_time: number;

  @Field(() => Int)
  move_ivl: number;

  @Field(() => Int)
  move_rap_limit: number;
}

@ObjectType()
export class SystemConfig implements System {
  @Field(() => Int)
  led_light1: number;

  @Field(() => Int)
  buzz_vol1: number;

  @Field(() => Int)
  heartbeat_ivl: number;

  @Field(() => Int)
  pwr_mode: number;

  @Field(() => Int)
  buzz_vol2: number;

  @Field(() => Int)
  led_time1: number;

  @Field(() => Int)
  wifi_mode: number;

  @Field(() => Int)
  buzz_time1: number;

  @Field(() => Int)
  led_time2: number;

  @Field(() => Int)
  led_light2: number;

  @Field(() => Int)
  buzz_time2: number;
}

@ObjectType()
export class DeviceConfig implements IDeviceConfig {
  @Field(() => Float)
  timestamp: number;

  @Field(() => EnvConfig)
  env: EnvConfig;

  @Field(() => MicConfig)
  mic: MicConfig;

  @Field(() => LightConfig)
  light: LightConfig;

  @Field(() => MoveConfig)
  move: MoveConfig;

  @Field(() => SystemConfig)
  system: SystemConfig;
}
