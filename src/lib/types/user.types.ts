import { MinMaxInputsOption } from '@/components/UserForm/Profile/MinMaxSelect';
import { GenericRecord, OmitKey, PickKey } from './types';
export interface UserQuery {
  position: string;
  experience: string;
  location: string;
  distance: string;
  jobType: string;
  scope: string;
}
export type MinMaxInputsValueWithoutTitle = OmitKey<MinMaxInputsOption, 'field'>;
export type Requirements = GenericRecord<MinMaxInputsValueWithoutTitle>;
export type ExcludeTechsOptions = GenericRecord<boolean>;
export interface UserOptions {
  userID?: string;
  overallEx?: number;
  requirements: Requirements;
  excludedRequirements: ExcludeTechsOptions;
  userQuery: UserQuery;
}

type OmitKeyUserPosAndLoc = OmitKey<UserQuery, 'location' | 'position'>;
type PickKeyUserPosAndLoc = PickKey<UserQuery, 'location' | 'position'>;

export type UserQueryTransform = PickKeyUserPosAndLoc &
  Record<keyof OmitKeyUserPosAndLoc, string | string[]>;

export type UserOptionsTransform = PickKey<UserOptions, 'overallEx' | 'userID' | 'requirements'> & {
  requirements: MinMaxInputsOption[];
  excludedRequirements: string[];
};
