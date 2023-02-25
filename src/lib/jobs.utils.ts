import { toast } from 'react-toastify';
import { API_ENDPOINTS, SERVER_URL } from './endpoints';
import { Job, ResponseGetJobs } from './jobsScanner.types';
import { GenericRecord } from './types/types';
import { createURL, fetchData } from './utils';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createJobsURl = (userID: string, params?: GenericRecord<any>) => {
  return createURL([SERVER_URL, API_ENDPOINTS.GET_JOBS, userID], params);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const jobsFetcher = async (userID: string, params: GenericRecord<any>) => {
  const url = createJobsURl(userID, params);
  const data = await fetchData<ResponseGetJobs>(url);
  return data;
};
/**
 *
 * @param {Job[]} jobs The jobs array.
 * @returns True if there is no jobs otherwise false.
 */
export const checkIsJobsFoundWithToast = (jobs: Job[]) => {
  if (!jobs?.length) {
    toast('אף משרה לא נמצאה, בצע חיפוש נוסף.', {
      toastId: 'noJobsFound'
    });
    return true;
  }
  return false;
};
export const defaultResponseJobs: ResponseGetJobs = {
  jobs: [] as Job[],
  pagination: {
    hasMore: false,
    totalDocs: 0,
    totalPages: 1
  }
};

/**
 * The useSWRInfinite provide an array of the data we get from the api.
 * So in order to get the last update data, we need to lookup it from the array.
 * If there is not such a data use the defaultResponseJobs.
 * @param {ResponseGetJobs[]|undefined} data Data from the useSWRInfinite.
 * @returns {{curData:ResponseGetJobs[],lastData:ResponseGetJobs}} The last data in ResponseGetJobs array.
 */
export const getLastCurJobData = (
  data: ResponseGetJobs[] | undefined
): { curData: ResponseGetJobs[]; lastData: ResponseGetJobs } => {
  const curData: ResponseGetJobs[] = data ? data : [defaultResponseJobs];
  const lengthCurData = curData.length;
  const lastData: ResponseGetJobs = curData[lengthCurData - 1];
  return {
    curData,
    lastData
  };
};
