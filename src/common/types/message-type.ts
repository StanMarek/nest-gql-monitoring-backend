export interface Message {
  device_id: string;
  message: {
    type: string;
    data: Record<string, unknown>;
  };
}
