import { MinMaxInputsOption } from '@/components/UserDetailsForm/Profile/MinMaxSelect';
import { UserOptions, UserQuery } from '../../lib/types/api.types';
import { OmitKey, PickKey } from '../../lib/types/types';
type OmitKeyUserPosAndLoc = OmitKey<UserQuery, 'location' | 'position'>;
type PickKeyUserPosAndLoc = PickKey<UserQuery, 'location' | 'position'>;

export type UserQueryTransform = PickKeyUserPosAndLoc &
  Record<keyof OmitKeyUserPosAndLoc, string | string[]>;

export type UserOptionsTransform = PickKey<UserOptions, 'overallEx' | 'userID' | 'requirements'> & {
  requirements: MinMaxInputsOption[];
  excludedRequirements: string[];
};
