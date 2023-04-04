import { UserProfileWithOneUserQuery } from '@/lib/types/user.types';
import { OmitKey } from '@/lib/types/types';
import { useSession } from 'next-auth/react';

import useUserProfile from './useUserProfile';
import { ReturnTypeGetInitialUserProfile } from '@/lib/getInitialUserProfile';

/**
 * @returns The data about the current login user
 */
export default function useAuth(initialUserProfile: ReturnTypeGetInitialUserProfile) {
  const { data, status } = useSession({
    required: true
  });
  const userProfileData = useUserProfile(initialUserProfile, data?.user.id || '');
  return {
    isAuthenticated: status === 'authenticated',
    ...data,
    ...userProfileData
  };
}

export type ReturnTypeUseAuth = ReturnType<typeof useAuth>;
export type ReturnTypeUseAuthProfileExist = OmitKey<ReturnTypeUseAuth, 'userProfileData'> & {
  userProfileData: UserProfileWithOneUserQuery;
};
