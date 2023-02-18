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
  distance: '1' | '2' | '3';
  jobType: string;
  scope: string;
  // Active: boolean = false;
}
export type MinMaxSelectValueWithoutTitle = OmitKey<MinMaxSelectOption, 'title'>;
export type Requirements = GenericRecord<MinMaxSelectValueWithoutTitle>;
export type ExcludeTechsOptions = GenericRecord<boolean>;

export type HashQueryEntity = InstanceType<typeof HashQuery>;
interface UserOptions {
  // _id: string;
  userID?: string;
  overallEx?: number;
  requirements: Requirements;
  excludedRequirements: ExcludeTechsOptions;
  // BlackList: string[];
  userQuery: GenericRecord<string>;
  // HashQueries?: HashQueryEntity[];
}
