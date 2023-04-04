import { API_ENDPOINTS, USERS_URL_API } from '../endpoints';

import { AxiosAPI } from './axios.api';

const jobsObservedAPI = new AxiosAPI(USERS_URL_API);

export const addNewJobObserved = async (userID: string, jobsID: string) => {
  const res = await jobsObservedAPI.post(
    {
      endpoints: [API_ENDPOINTS.JOBS_OBSERVED(userID)]
    },
    {
      jobsID
    }
  );
  return res;
};
