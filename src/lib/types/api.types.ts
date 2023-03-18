import { MESSAGES, MESSAGE_CODES } from '../messages';

export interface Location {
  locationID: string;
  locationName: string;
}
export interface Position {
  positionID: string;
  positionName: string;
}
export type KeyCode = keyof typeof MESSAGE_CODES;
export type Code = (typeof MESSAGE_CODES)[KeyCode];
export type MessageRes = (typeof MESSAGES)[Code];

export interface ResponseMessage {
  message: MessageRes;
  code: Code;
}
