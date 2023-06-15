export interface Message {
  device_id: string;
  message: {
    type: MessageType;
    data: Record<string, unknown>;
  };
}

export enum MessageType {}
