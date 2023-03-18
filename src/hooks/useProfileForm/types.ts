import { MinMaxInputsOption } from '@/components/UserProfileForm/Requirements/MinMaxInputs';
import { UserProfile, UserQuery } from '../../lib/types/user.types';
import { OmitKey, PickKey } from '../../lib/types/types';
type OmitKeyUserPosAndLoc = OmitKey<UserQuery, 'location' | 'position'>;
type PickKeyUserPosAndLoc = PickKey<UserQuery, 'location' | 'position'>;

export type UserQueryTransform = PickKeyUserPosAndLoc &
  Record<keyof OmitKeyUserPosAndLoc, string | string[]>;

export type UserProfileTransform = PickKey<UserProfile, 'overallEx' | 'userID' | 'requirements'> & {
  requirements: MinMaxInputsOption[];
  excludedRequirements: string[];
};
