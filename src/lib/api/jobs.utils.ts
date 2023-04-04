import { API_ENDPOINTS, CLIENT_URL } from '../endpoints';

import { GenericRecord } from '../types/types';
import { createURLPath } from '../utils';
import { AxiosAPI } from './axios.api';

const jobsAPI = new AxiosAPI(createURLPath([CLIENT_URL, API_ENDPOINTS.GET_JOBS]));

export const getJobs = async <R>(userID: string, params: GenericRecord<unknown>) => {
  try {
    const result = await jobsAPI.get<R>({
      endpoints: [userID],
      params
    });

    return result;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
