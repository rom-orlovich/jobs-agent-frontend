import { API_ENDPOINTS } from './endpoints';
import { Job } from './jobsScanner.types';
import { ResponseMessage, TrackInfo } from './types/api.types';
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
export const updateNewJobTrack = async (userID: string, trackInfo: TrackInfo) => {
  const result = await fetchUtil<TrackInfo, ResponseMessage>(
    createURL([API_ENDPOINTS.USERS_JOB_TRACK(userID)]),
    {
      method: 'PATCH',
      body: trackInfo
    }
  );
  console.log(result);
  return result;
};
export const deleteJobTrack = async (userID: string, trackInfoID: string) => {
  const result = await fetchUtil<TrackInfo, ResponseMessage>(
    createURL([API_ENDPOINTS.USERS_JOB_TRACK(userID), trackInfoID]),
    {
      method: 'DELETE'
    }
  );
  console.log(result);
  return result;
};
