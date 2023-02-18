export interface ExperienceRange {
  min: number;
  max: number;
}

export type requirements = GenericRecord<ExperienceRange>;
export type ExcludeTechsOptions = GenericRecord<boolean>;

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

export type UserEntity = InstanceType<typeof User>;
export type HashQueryEntity = InstanceType<typeof HashQuery>;
interface UserOptions {
  _id: string;
  overallEx?: number;
  requirements: requirements;
  excludeTechs: ExcludeTechsOptions;
  // BlackList: string[];
  userQuery: UserQuery;
  // HashQueries?: HashQueryEntity[];
}
