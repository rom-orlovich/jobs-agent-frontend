import { API_ENDPOINTS, USERS_URL_API } from '../endpoints';
import { ResponseMessage } from '../types/api.types';

import { AxiosAPI } from './axios.api';

const jobsObservedAPI = new AxiosAPI(USERS_URL_API);

export const addNewJobObserved = async (userID: string, jobID: string) => {
  const res = await jobsObservedAPI.post<ResponseMessage>(
    {
      endpoints: [API_ENDPOINTS.JOBS_OBSERVED(userID)]
    },
    {
      jobID
    }
  );
  return res;
};
