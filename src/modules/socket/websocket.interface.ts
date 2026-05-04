export interface RegisterPayload {
  type: "REGISTER";
  userId: string;
}

export interface SendMessagePayload {
  type: "SEND_MESSAGE";
  from: string;
  to: string;
  message: string;
}