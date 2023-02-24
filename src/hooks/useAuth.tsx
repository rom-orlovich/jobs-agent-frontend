import { UserProfileWithOneUserQuery } from '@/lib/types/api.types';
import { OmitKey } from '@/lib/types/types';
import { useSession } from 'next-auth/react';

import userProfile from './useUserProfile';
export default function useAuth() {
  const { data, status } = useSession({
    required: true
  });
  const { userProfileData, isLoading } = userProfile(data?.user.id || '');
  return {
    isAuthenticated: status === 'authenticated',
    ...data,
    userProfileData,
    isLoading
  };
}

export type ReturnTypeUseAuth = ReturnType<typeof useAuth>;
export type ReturnTypeUseAuthProfileExist = OmitKey<ReturnTypeUseAuth, 'userProfileData'> & {
  userProfileData: UserProfileWithOneUserQuery;
};
