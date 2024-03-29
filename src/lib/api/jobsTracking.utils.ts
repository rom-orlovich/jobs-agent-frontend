import { API_ENDPOINTS, CLIENT_URL } from '@/lib/endpoints';
import { Job } from '@/lib/types/jobsScanner.types';

import { createURLPath } from '@/lib/utils';
import { ResponseMessage } from '../types/api.types';
import { AxiosAPI } from './axios.api';

const jobsTracksAPI = new AxiosAPI(createURLPath([CLIENT_URL, API_ENDPOINTS.USERS]));

export const updateJobsTracking = async (userID: string, job: Job) => {
  const result = await jobsTracksAPI.put<ResponseMessage>(
    {
      endpoints: [API_ENDPOINTS.JOBS_TRACKINGS_INFO(userID)]
    },
    job
  );
  return result;
};
export const createNewJobTracking = async (userID: string, job: Job) => {
  const result = await jobsTracksAPI.post<ResponseMessage>(
    {
      endpoints: [API_ENDPOINTS.JOBS_TRACKINGS_INFO(userID)]
    },
    job
  );

  return result;
};

export const deleteJobTracking = async (userID: string, jobID: string) => {
  const result = await jobsTracksAPI.delete<ResponseMessage>({
    endpoints: [API_ENDPOINTS.JOBS_TRACKINGS_INFO(userID), jobID]
  });

  return result;
};
