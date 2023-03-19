import { MinMaxInputsOption } from '@/components/UserProfileForm/Requirements/MinMaxInputs';
import { UserProfile, UserQuery } from '../../lib/types/user.types';
import { OmitKey, PickKey } from '../../lib/types/types';
import { YEARS_EXPERIENCE_WORDS_NUM } from './utils';
type OmitKeyUserPosAndLoc = OmitKey<UserQuery, 'location' | 'position'>;
type PickKeyUserPosAndLoc = PickKey<UserQuery, 'location' | 'position'>;

export type YearsExperienceObjWordsNum = typeof YEARS_EXPERIENCE_WORDS_NUM;
export type YearsExperienceObjWordsNumKeys = keyof YearsExperienceObjWordsNum;

export type UserQueryTransform = PickKeyUserPosAndLoc &
  Record<keyof OmitKeyUserPosAndLoc, string | string[]>;

export type UserProfileTransform = PickKey<UserProfile, 'overallEx' | 'userID' | 'requirements'> & {
  requirements: MinMaxInputsOption[];
  excludedRequirements: string[];
};
