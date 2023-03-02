import { API_ENDPOINTS, SERVER_URL } from '../endpoints';

import { GenericRecord } from '../types/types';
import { convertResourceToURL } from '../utils';
import { AxiosAPI } from './axios.api';
const jobsAPI = new AxiosAPI(convertResourceToURL([SERVER_URL, API_ENDPOINTS.GET_JOBS]));

export const getJobs = async <R>(userID: string, params: GenericRecord<unknown>) => {
  try {
    const result = await jobsAPI.get<R>({
      endpoints: [userID],
      params
    });
    console.log(result.data);
    return result;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
