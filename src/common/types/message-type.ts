export interface Message {
  device_id: string;
  message: {
    type: MessageType;
    data: Record<string, string | number>;
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
