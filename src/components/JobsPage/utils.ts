import { SWRInfiniteKeyLoader } from 'swr/infinite';

import { API_ENDPOINTS, SERVER_URL } from '../../lib/endpoints';
import { Job, ResponseGetJobs } from '../../lib/types/jobsScanner.types';
import { UserProfileWithOneUserQuery } from '../../lib/types/api.types';
import { AnyFun, GenericRecord } from '../../lib/types/types';
import { createToastCBWithData, createURL } from '../../lib/utils';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
/**
 *
 * @param {Job[]} jobs The jobs array.
 * @returns {Job[]| undefined } True if there is no jobs otherwise false.
 */
/**
 * @param {Job[]} jobs The jobs array.
 * @returns {Job[]| undefined } True if there is no jobs otherwise false.
 */
export const checkIsJobsFoundWithToast = (jobs: Job[]): { cb: AnyFun; data: Job[] | undefined } => {
  try {
    if (!jobs?.length) return createToastCBWithData(undefined, 'JOBS_ARE_NOT_FOUND');
    return createToastCBWithData(jobs, 'SCANNER_SUCCESS');
  } catch (error) {
    return createToastCBWithData(undefined, 'SOMETHING_WRONG');
  }
};

export const checkIsJobFoundWithToast = (job?: Job) => {
  try {
    if (!job) return createToastCBWithData(undefined, 'JOB_IS_NOT_FOUND');
    return createToastCBWithData(job, 'JOB_IS_FOUND');
  } catch (error) {
    return createToastCBWithData(undefined, 'SOMETHING_WRONG');
  }
};

export const defaultResponseJobs: ResponseGetJobs = {
  jobs: [] as Job[],
  pagination: {
    hasMore: false,
    totalDocs: 0,
    totalPages: 1,
    numResultsFound: 0
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
  return createURL([SERVER_URL, API_ENDPOINTS.GET_JOBS, userID], params);
};

//Swr infinite handler.
export const swrInfiniteHandler: (
  userProfileData: UserProfileWithOneUserQuery,
  params?: GenericRecord<unknown>
) => SWRInfiniteKeyLoader<ResponseGetJobs, string | null> =
  (userProfileData, params) => (prePage: number, preData) => {
    //Check if there it is possible to page to the next results page.
    if (preData?.pagination.hasMore === false) return null;

    //Create the jobs url with the cur URL parameters.
    return createJobsURl(userProfileData?.userID, {
      page: prePage + 1,
      hash: userProfileData.activeHash,
      ...params
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
