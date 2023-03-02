import { API_ENDPOINTS, CLIENT_URL } from '@/lib/endpoints';
import { Job } from '@/lib/jobsScanner.types';
import { ResponseMessage } from '@/lib/types/api.types';
import { convertResourceToURL } from '@/lib/utils';
import { AxiosAPI } from '../axios.api';

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
