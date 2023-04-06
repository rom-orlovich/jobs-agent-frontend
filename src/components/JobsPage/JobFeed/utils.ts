import { createNewJobTracking, deleteJobTracking } from '@/lib/api/jobsTracking.utils';
import { API_ENDPOINTS } from '@/lib/endpoints';
import { Job } from '@/lib/types/jobsScanner.types';
import { GenericRecord } from '@/lib/types/types';
import { MouseEventHandler } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { AxiosAPI } from '@/lib/api/axios.api';
import { addNewJobObserved } from '@/lib/api/jobsObserved.utils';
/**
 * This function is for indexing the current user's jobs tracking.
 * The indexing enable to lookup easily if there is some job from the feed that is already exist in user's jobs tracking list.
 * @param tracking Array of the jobs info from user profile data.
 * @returns {GenericRecord<TrackingInfo>} A obj that the keys are the jobID and the values are the tracking object.
 */
export const createJobsTrackingMap = (tracking: Job[]): GenericRecord<Job> => {
  const JobTrackingMap: GenericRecord<Job> = {};
  tracking?.forEach((jobTracking) => (JobTrackingMap[`${jobTracking.jobID}`] = jobTracking));
  return JobTrackingMap;
};

export const handleClickBookmark: (
  jobsTrackMap: GenericRecord<Job>,
  userID?: string
) => (job: Job) => MouseEventHandler<HTMLButtonElement> = (jobsTrackMap, userID) => (job) => {
  return async (e) => {
    e.preventDefault();
    if (!userID) return;
    try {
      //Check if the job exist in the jobsTrackMap. If it doesn't add it. Otherwise delete it.
      if (!jobsTrackMap[job.jobID]) await createNewJobTracking(userID, job);
      else await deleteJobTracking(userID, job.jobID);

      //Update the user profile.
      await mutate(`/${API_ENDPOINTS.USERS}/${userID}`).then((el) => console.log(el));
    } catch (error) {
      //Fire a toast if there is error.
      toast(AxiosAPI.handleError(error).message);
    }
  };
};

/**
 Save the job that the user has currently observed.
 * @param {string} jobsID The id of the observed job.
 * @param {string | undefined} userID The id of the user.
 */
export const handleSaveObservedJob: (
  jobsID: string,
  userID?: string
) => MouseEventHandler<HTMLAnchorElement> = (jobsID: string, userID: string | undefined) => async () => {
  if (!userID) return;
  try {
    //Save the job that the user has currently observed.
    await addNewJobObserved(userID, jobsID);
    //Update the user profile.
    await mutate(`/${API_ENDPOINTS.USERS}/${userID}`).then((el) => console.log(el));

    //Fire a toast.
    // toast(result.data.message);
  } catch (error) {
    // toast(AxiosAPI.handleError(error).message);
  }
};
