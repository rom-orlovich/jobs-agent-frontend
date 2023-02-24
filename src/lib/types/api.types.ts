import { MinMaxInputsOption } from '@/components/UserProfileForm/Requirements/MinMaxInputs';
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
  createdAt?: Date;
}
export type MinMaxInputsValueWithoutTitle = OmitKey<MinMaxInputsOption, 'field'>;
export type Requirements = GenericRecord<MinMaxInputsValueWithoutTitle>;
export type ExcludeTechsOptions = GenericRecord<boolean>;
export interface UserProfile {
  userID?: string;
  overallEx?: number;
  requirements: Requirements;
  excludedRequirements: ExcludeTechsOptions;
  userQueries: UserQuery[];
}

export type UserProfileWithOneUserQuery = OmitKey<UserProfile, 'userQueries'> & { userQuery: UserQuery };
