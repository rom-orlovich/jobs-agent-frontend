import { MinMaxInputsOption } from '@/components/UserForm/Profile/MinMaxInputs';
import { GenericRecord } from './type';

export interface ExperienceRange {
  min: number;
  max: number;
}

interface HashQueryProps {
  hash: string;
  addedAt: Date;
  expireAt: number;
}

export interface UserQuery {
  position: string;
  experience: string;
  location: string;
  distance: string;
  jobType: string;
  scope: string;
  // Active: boolean = false;
}
export type MinMaxInputsValueWithoutTitle = OmitKey<MinMaxInputsOption, 'title'>;
export type Requirements = GenericRecord<MinMaxInputsValueWithoutTitle>;
export type ExcludeTechsOptions = GenericRecord<boolean>;

export type HashQueryEntity = InstanceType<typeof HashQuery>;
interface UserOptions {
  // _id: string;
  userID?: string;
  overallEx?: number;
  requirements: Requirements;
  excludedRequirements: ExcludeTechsOptions;
  // BlackList: string[];
  userQuery: UserQuery;
  // HashQueries?: HashQueryEntity[];
}
