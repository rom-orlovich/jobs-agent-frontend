import { API_ENDPOINTS } from './endpoints';
import { Job } from './jobsScanner.types';
import { ResponseMessage } from './types/api.types';
import { createURL, fetchUtil } from './utils';

export const createNewJobTracking = async (userID: string, job: Job) => {
  const result = await fetchUtil<Job, ResponseMessage>(
    createURL([API_ENDPOINTS.JOBS_TRACKING_INFO(userID)]),
    {
      method: 'POST',
      body: job
    }
  );
  console.log(result);
  return result;
};
export const updateNewJobTracking = async (userID: string, job: Job) => {
  const result = await fetchUtil<Job, ResponseMessage>(
    createURL([API_ENDPOINTS.JOBS_TRACKING_INFO(userID)]),
    {
      method: 'PATCH',
      body: job
    }
  );
  console.log(result);
  return result;
};
export const deleteJobTracking = async (userID: string, jobID: string) => {
  const result = await fetchUtil<undefined, ResponseMessage>(
    createURL([`/${API_ENDPOINTS.JOBS_TRACKING_INFO(userID)}`, jobID]),
    {
      method: 'DELETE'
    }
  );
  console.log(result);
  return result;
};
