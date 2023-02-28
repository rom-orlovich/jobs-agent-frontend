import { API_ENDPOINTS } from './endpoints';
import { Job } from './jobsScanner.types';
import { ResponseMessage } from './types/api.types';
import { createURL, fetchUtil } from './utils';

export const createNewJobTrack = async (userID: string, job: Job) => {
  const result = await fetchUtil<Job, ResponseMessage>(
    createURL([API_ENDPOINTS.USERS_JOB_TRACK(userID)]),
    {
      method: 'POST',
      body: job
    }
  );
  console.log(result);
  return result;
};
export const updateNewJobTrack = async (userID: string, job: Job) => {
  const result = await fetchUtil<Job, ResponseMessage>(
    createURL([API_ENDPOINTS.USERS_JOB_TRACK(userID)]),
    {
      method: 'PATCH',
      body: job
    }
  );
  console.log(result);
  return result;
};
export const deleteJobTrack = async (userID: string, jobID: string) => {
  const result = await fetchUtil<undefined, ResponseMessage>(
    createURL([API_ENDPOINTS.USERS_JOB_TRACK(userID), jobID]),
    {
      method: 'DELETE'
    }
  );
  console.log(result);
  return result;
};
