import { MinMaxInputsOption } from '@/components/UserProfileForm/Requirements/MinMaxInputs';
import { Job } from './jobsScanner.types';
import { GenericRecord, OmitKey } from './types';

export interface UserQuery {
  position: string;
  experience: string;
  location: string;
  distance: string;
  jobType: string;
  scope: string;
  hash?: string;
  updatedAt?: string;
  numResultsFound?: number;
  numMatches?: number;
}
export type MinMaxInputsValueWithoutTitle = OmitKey<MinMaxInputsOption, 'field'>;
export type Requirements = GenericRecord<MinMaxInputsValueWithoutTitle>;
export type ExcludeTechsOptions = GenericRecord<boolean>;

export interface UserProfile {
  userID?: string;
  activeHash?: string;
  overallEx?: string;
  requirements: Requirements;
  excludedRequirements: ExcludeTechsOptions;
  userQueries: UserQuery[];
  tracking?: Job[];
}

export type UserProfileWithOneUserQuery = OmitKey<UserProfile, 'userQueries'> & { userQuery: UserQuery };
