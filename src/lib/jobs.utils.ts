import { toast } from 'react-toastify';
import { API_ENDPOINTS, SERVER_URL } from './endpoints';
import { Job, ResponseGetJobs } from './jobsScanner.types';
import { GenericRecord } from './types/types';
import { createURL, fetchData } from './utils';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createJobsURl = (userID: string, params: GenericRecord<any>) => {
  return createURL([SERVER_URL, API_ENDPOINTS.GET_JOBS, userID], params);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const jobsFetcher = async (userID: string, params: GenericRecord<any>) => {
  const url = createJobsURl(userID, params);
  const data = await fetchData<ResponseGetJobs>(url);
  return data;
};

export const noJobFoundCBwithToast = (jobs: Job[]) => {
  if (!jobs?.length) {
    toast('אף משרה לא נמצאה, בצע חיפוש נוסף.', {
      toastId: 'noJobsFound'
    });
  }
};
