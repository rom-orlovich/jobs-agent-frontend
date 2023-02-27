import { UserProfile, UserProfileWithOneUserQuery, UserQuery } from '@/lib/types/api.types';

import { useSwrHook } from './useSwr';

/**
 *This hook fetches the user data from the DB.
 If the user is not exist, initialize a new one.
 The hook is handle to get the last user's query result if its exist, and spread his queries to userHistoryQueries for search history page.
 * @param {string} userID The userID of the current login user.
 * @returns The user data, and the state of the fetch request.
 */
function useUserProfile(userID: string) {
  const { data, error, isLoading, isValidating } = useSwrHook<{ data: UserProfile }>(
    `/api/users/${userID}`,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false
    }
  );

  const defaultUserProfile: UserProfileWithOneUserQuery = {
    userID: userID,
    overallEx: 0,
    requirements: {},
    excludedRequirements: {},
    userQuery: {
      distance: '',
      experience: '',
      jobType: '',
      location: '',
      position: '',
      scope: '',
      numResultFound: 0
    }
  };
  let userProfileData: UserProfileWithOneUserQuery | undefined = defaultUserProfile;
  let userHistoryQueries: UserQuery[] = [];
  if (data?.data) {
    const { userQueries, ...restUserProps } = data?.data;
    const lengthUserQuery = userQueries?.length;
    userHistoryQueries = userQueries;
    userProfileData = {
      ...restUserProps,
      userQuery: {
        ...userQueries[lengthUserQuery - 1],
        createdAt: userQueries[lengthUserQuery - 1].createdAt
      }
    };
  }
  return {
    userHistoryQueries,
    userProfileData,
    error,
    isLoading,
    isValidating
  };
}

export default useUserProfile;
