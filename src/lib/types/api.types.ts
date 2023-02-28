import { MinMaxInputsOption } from '@/components/UserProfileForm/Requirements/MinMaxInputs';
import { Job } from '../jobsScanner.types';

import { MESSAGES, MESSAGE_CODES } from '../messages';
import { GenericRecord, OmitKey } from './types';

export interface Location {
  locationID: string;
  locationName: string;
}
export interface Position {
  positionID: string;
  positionName: string;
}

export interface UserQuery {
  position: string;
  experience: string;
  location: string;
  distance: string;
  jobType: string;
  scope: string;
  hash?: string;
  createdAt?: string;
  numResultFound?: number;
  numMatches?: number;
}
export type MinMaxInputsValueWithoutTitle = OmitKey<MinMaxInputsOption, 'field'>;
export type Requirements = GenericRecord<MinMaxInputsValueWithoutTitle>;
export type ExcludeTechsOptions = GenericRecord<boolean>;
export interface UserProfile {
  userID?: string;
  activeHash?: string;
  overallEx?: number;
  requirements: Requirements;
  excludedRequirements: ExcludeTechsOptions;
  userQueries: UserQuery[];
  jobsTrack?: Job[];
}

export type UserProfileWithOneUserQuery = OmitKey<UserProfile, 'userQueries'> & { userQuery: UserQuery };

export type KeyCode = keyof typeof MESSAGE_CODES;
export type Code = (typeof MESSAGE_CODES)[KeyCode];
export type MessageRes = (typeof MESSAGES)[Code];

export interface ResponseMessage {
  message: MessageRes;
  code: Code;
}
