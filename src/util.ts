import {
  Heartbeat,
  HeartbeatMessageData,
  ReportMessage,
  ReportMessageData,
} from './common/types/message-type';

export const castMessageDataToEntity = (
  reportData: ReportMessageData,
  serial: string,
): ReportMessage => {
  return {
    date: new Date(),
    environment: {
      h: reportData.env.h,
      t: reportData.env.t,
      hAvg: reportData.env.havg,
      tAvg: reportData.env.tavg,
      hMax: reportData.env.hmax,
      tMax: reportData.env.tmax,
      hMin: reportData.env.hmin,
      tMin: reportData.env.tmin,
    },
    lightsensor: {
      light: reportData.light.light,
    },
    mic: {
      alarm1Cnt: reportData.mic.alarm1_cnt,
      alarm2Cnt: reportData.mic.alarm2_cnt,
      alarmAl1Cnt: reportData.mic.alarm_al1_cnt,
      alarmAl2Cnt: reportData.mic.alarm_al2_cnt,
      avgDb: reportData.mic.avg_db,
      maxDb: reportData.mic.max_db,
      micTamer: reportData.mic.mic_tamer,
      noiseLvlDb: reportData.mic.noise_lvl_db,
    },
    pirsensor: {
      cnt: reportData.pirsensor.cnt,
      time: reportData.pirsensor.time,
    },
    device: serial,
  };
};

export const castHeartbeatDataToEntity = (
  diagnoscticsData: HeartbeatMessageData,
): Heartbeat => {
  return {
    ...diagnoscticsData,
    date: new Date(),
    configId: diagnoscticsData.config_id,
    conUptime: diagnoscticsData.con_uptime,
    errorFlag: diagnoscticsData.error_flag,
    memFree: diagnoscticsData.mem_free,
    powerMode: diagnoscticsData.power_mode,
  };
};
