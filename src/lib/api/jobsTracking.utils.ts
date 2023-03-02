import { API_ENDPOINTS, CLIENT_URL } from '@/lib/endpoints';
import { Job } from '@/lib/jobsScanner.types';
import { ResponseMessage } from '@/lib/types/api.types';
import { convertResourceToURL } from '@/lib/utils';
import { AxiosAPI } from './axios.api';

const jobsTracks = new AxiosAPI(convertResourceToURL([CLIENT_URL, API_ENDPOINTS.USERS]));
export const updateJobsTracking = async (userID: string, job: Job) => {
  console.log(job);
  const result = await jobsTracks.put<ResponseMessage>(
    {
      endpoints: [API_ENDPOINTS.JOBS_TRACKING_INFO(userID)]
    },
    job
  );
  console.log([API_ENDPOINTS.JOBS_TRACKING_INFO(userID)]);

  return result;
};
export const createNewJobTracking = async (userID: string, job: Job) => {
  const result = await jobsTracks.post<ResponseMessage>(
    {
      endpoints: [API_ENDPOINTS.JOBS_TRACKING_INFO(userID)]
    },
    job
  );
  console.log(result);
  return result;
};

export const deleteJobTracking = async (userID: string, jobID: string) => {
  const result = await jobsTracks.delete<ResponseMessage>({
    endpoints: [API_ENDPOINTS.JOBS_TRACKING_INFO(userID), jobID]
  });
  console.log(result);
  return result;
};
