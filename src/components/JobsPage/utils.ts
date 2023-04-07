import { SWRInfiniteKeyLoader } from 'swr/infinite';

import { API_ENDPOINTS, CLIENT_URL } from '../../lib/endpoints';
import { Job, ResponseGetJobs } from '../../lib/types/jobsScanner.types';
import { UserProfileWithOneUserQuery } from '../../lib/types/user.types';
import { GenericRecord } from '../../lib/types/types';
import { createURL } from '../../lib/utils';

export const defaultResponseJobs: ResponseGetJobs = {
  jobs: [] as Job[],
  pagination: {
    hasMore: false,
    totalDocs: 0,
    totalPages: 1,
    numResultsAfterFilter: 0
  },
  filters: {
    companies: [],
    from: [],
    locations: [],
    reasons: [],
    titles: []
  }
};
/**
 * The useSWRInfinite provide an array of the jobData we get from the api.
 * So in order to get the last update jobData, we need to lookup it from the array.
 * If there is not such a jobData use the defaultResponseJobs.
 * @param {ResponseGetJobs[]|undefined} jobData Data from the useSWRInfinite.
 * @returns {{curData:ResponseGetJobs[],lastResponse:ResponseGetJobs}} The last jobData in ResponseGetJobs array.
 */
export const getLastCurJobData = (
  jobData: ResponseGetJobs[] | undefined
): { allResponseData: ResponseGetJobs[]; lastResponse: ResponseGetJobs } => {
  const allResponseData: ResponseGetJobs[] = jobData ? jobData : [defaultResponseJobs];
  const lengthCurData = allResponseData.length;

  const lastResponse: ResponseGetJobs = allResponseData[lengthCurData - 1];
  return {
    allResponseData,
    lastResponse
  };
};

export const createJobsURl = (userID?: string, params?: GenericRecord<unknown>) => {
  return createURL([CLIENT_URL, API_ENDPOINTS.GET_JOBS, userID], params);
};

//Swr infinite handler.
export const swrInfiniteHandler: (
  userProfileData: UserProfileWithOneUserQuery,
  params?: GenericRecord<unknown>
) => SWRInfiniteKeyLoader<ResponseGetJobs, string | null> =
  (userProfileData, params) => (prePage: number, preData) => {
    //Check if there it is possible to page to the next results page.
    if (preData?.pagination.hasMore === false || !userProfileData.activeHash) return null;
    //Create the jobs url with the cur URL parameters.

    return createJobsURl(userProfileData?.userID, {
      ...params,
      page: prePage + 1,
      hash: userProfileData.activeHash
    });
  };

/**
 * @param condition If to set the value of reason  to 'match' value.
 * @returns The result of the condition. In order to display only the matches jobs.
 */
export const isJobsMatchesPage = (condition: boolean) =>
  condition
    ? {
        reason: 'match'
      }
    : {};
