import { toast } from 'react-toastify';

import { API_ENDPOINTS, SERVER_URL } from './endpoints';
import { Job, ResponseGetJobs } from './jobsScanner.types';
import { MESSAGES, MESSAGE_CODES } from './messages';
import { GenericRecord } from './types/types';
import { createURL, fetchUtil, getResMessage } from './utils';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createJobsURl = (userID: string, params?: GenericRecord<any>) => {
  return createURL([SERVER_URL, API_ENDPOINTS.GET_JOBS, userID], params);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const jobsFetcher = async (userID: string, params: GenericRecord<any>) => {
  const url = createJobsURl(userID, params);
  const data = await fetchUtil<undefined, ResponseGetJobs>(url);
  return data;
};
/**
 *
 * @param {Job[]} jobs The jobs array.
 * @returns {Job[]| undefined } True if there is no jobs otherwise false.
 */
export const checkIsJobsFoundWithToast = (jobs: Job[]): Job[] | undefined => {
  try {
    if (!jobs?.length) {
      console.log(MESSAGES[MESSAGE_CODES.JOB_ARE_NOT_FOUND]);
      toast(getResMessage('JOB_ARE_NOT_FOUND').message, {
        rtl: true,
        toastId: 'noJobsFound'
      });
      return undefined;
    }
    toast(getResMessage('SCANNER_SUCCESS').message, {
      rtl: true,
      toastId: 'jobsFound'
    });
    return jobs;
  } catch (error) {
    toast(getResMessage('SOMETHING_WRONG').message, {
      rtl: true,
      toastId: 'somethingWrong'
    });
    return undefined;
  }
};
export const checkIsJobFoundWithToast = (job?: Job) => {
  try {
    if (!job) {
      toast(getResMessage('JOB_IS_NOT_FOUND').message, {
        toastId: 'jobIsNotFound',
        rtl: true
      });
      return undefined;
    }
    toast(getResMessage('JOB_IS_FOUND').message, {
      rtl: true,
      toastId: 'jobFound'
    });
    return job;
  } catch (error) {
    console.log(error);
    toast(getResMessage('SOMETHING_WRONG').message, {
      rtl: true,
      toastId: 'somethingWrong'
    });
    return undefined;
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
 *
 * @param {ResponseGetJobs | undefined} jobData The jobs data that may be undefined.
 * @returns {ResponseGetJobs} If the data is undefined the the default data will be defaultResponseJobs. Otherwise the data will be jobData.
 */
export const getJobsExistData = (jobData?: ResponseGetJobs): ResponseGetJobs =>
  jobData ? jobData : defaultResponseJobs;

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
