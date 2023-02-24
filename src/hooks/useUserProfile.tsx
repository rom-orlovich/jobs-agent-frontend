import { UserProfile, UserProfileWithOneUserQuery } from '@/lib/types/api.types';

import { useSwrHook } from './useSwr';

function useUserProfile(userID: string) {
  const { data, error, isLoading, isValidating } = useSwrHook<{ data: UserProfile }>(
    `/api/users/${userID}`
  );

  // const defaultUserProfile: UserProfileWithOneUserQuery = {
  //   userID: userID,
  //   overallEx: 0,
  //   requirements: {},
  //   excludedRequirements: {},
  //   userQuery: {
  //     distance: '',
  //     experience: '',
  //     jobType: '',
  //     location: '',
  //     position: '',
  //     scope: ''
  //   }
  // };
  let userProfileData: UserProfileWithOneUserQuery | undefined = undefined;
  if (data?.data) {
    const { userQueries, ...restUserProps } = data?.data;
    const lengthUserQuery = userQueries.length;
    // console.log(data?.data);
    userProfileData = {
      ...restUserProps,
      userQuery: {
        ...userQueries[lengthUserQuery - 1],
        createdAt: userQueries[lengthUserQuery - 1].createdAt
      }
    };
  }
  return {
    userProfileData,
    error,
    isLoading,
    isValidating
  };
}

export default useUserProfile;
