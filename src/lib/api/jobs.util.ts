import { API_ENDPOINTS } from '../endpoints';

import { GenericRecord } from '../types/types';
import { createURLPath } from '../utils';
import { AxiosAPI } from './axios.api';

const jobsAPI = new AxiosAPI(createURLPath([API_ENDPOINTS.GET_JOBS]));

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
