export interface ExperienceRange {
  min: number
  max: number
}

export type RequirementsOptions = GenericRecord<ExperienceRange>
export type ExcludeTechsOptions = GenericRecord<boolean>

interface HashQueryProps {
  hash: string
  addedAt: Date
  expireAt: number
}

export type UserEntity = InstanceType<typeof User>
export type HashQueryEntity = InstanceType<typeof HashQuery>
interface UserOptions {
  _id: string
  overallEx?: number
  requirementsOptions: RequirementsOptions
  excludeTechs: ExcludeTechsOptions
  // BlackList: string[];
  userQuery: UserQuery
  // HashQueries?: HashQueryEntity[];
}
