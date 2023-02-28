import { API_ENDPOINTS } from './endpoints';
import { Job } from './jobsScanner.types';
import { createURL } from './utils';

export const createJobTrack = async (userID: string, job: Job) => {
  try {
    const data = await fetch(createURL([API_ENDPOINTS.USERS_JOB_TRACK(userID)]), {
      method: 'POST',
      body: JSON.stringify(job)
    });
    const res = await data.json();
    return res;
  } catch (error) {
    return error;
  }
};
