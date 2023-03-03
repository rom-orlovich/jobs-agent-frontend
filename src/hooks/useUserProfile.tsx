import { UserProfile, UserProfileWithOneUserQuery, UserQuery } from '@/lib/types/api.types';
import { useRouter } from 'next/router';

import { useSwrHook } from '../lib/swr';

/**
 *This hook fetches the user data from the DB.
 If the user is not exist, initialize a new one.
 The hook is handle to get the last user's query result if its exist, and spread his queries to userHistoryQueries for search history page.
 * @param {string} userID The userID of the current login user.
 * @returns The user data, and the state of the fetch request.
 */
function useUserProfile(userID: string) {
  const router = useRouter();
  //Initial the fetching of current login user's data.
  const { data, error, isLoading, isValidating } = useSwrHook<{ data: UserProfile }>(
    `/api/users/${userID}`,
    {
      revalidateIfStale: true,
      revalidateOnMount: true,
      refreshWhenOffline: false,
      revalidateOnReconnect: false,

      revalidateOnFocus: true
    }
  );
  //Default values.
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

  //Check if the user exist and has profile data.
  if (data?.data) {
    let curEditHashQuery = router.query.hash;

    //Check it the hash is valid string.
    curEditHashQuery = typeof curEditHashQuery === 'string' ? curEditHashQuery : '';

    const { userQueries, tracking, ...restUserProps } = data?.data;
    let curUserQuery;

    if (userQueries) {
      //If there is editQueryHash so find the query from the userQueries and use its data.
      if (curEditHashQuery) curUserQuery = userQueries.find((query) => query.hash === curEditHashQuery);

      //If not use the default query - the last userQuery.
      if (!curUserQuery) {
        const lengthUserQuery = userQueries?.length - 1;
        curUserQuery = userQueries[lengthUserQuery];
      }
    }

    userHistoryQueries = userQueries;

    userProfileData = {
      ...restUserProps,
      tracking,
      activeHash: curEditHashQuery ? curEditHashQuery : curUserQuery?.hash,
      userQuery: curUserQuery || defaultUserProfile.userQuery
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
