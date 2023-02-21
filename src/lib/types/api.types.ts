import { MinMaxInputsOption } from '@/components/UserDetailsForm/Requirements/MinMaxInputs';
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
