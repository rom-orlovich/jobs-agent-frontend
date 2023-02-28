import { MinMaxInputsOption } from '@/components/UserProfileForm/Requirements/MinMaxInputs';
import { Job } from '../jobsScanner.types';
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
export interface TrackInfo {
  jobID: string;
  jobInfo: OmitKey<Job, 'jobID'>;
  addedAt: Date;
  sendCV: { status: boolean; date: Date };
  stages: { name: string; status: boolean; note: string }[];
}
export interface UserProfile {
  userID?: string;
  activeHash?: string;
  overallEx?: number;
  requirements: Requirements;
  excludedRequirements: ExcludeTechsOptions;
  userQueries: UserQuery[];
  track?: TrackInfo[];
}

export type UserProfileWithOneUserQuery = OmitKey<UserProfile, 'userQueries'> & { userQuery: UserQuery };
