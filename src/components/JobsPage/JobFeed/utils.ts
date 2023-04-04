import { createNewJobTracking, deleteJobTracking } from '@/lib/api/jobsTracking.utils';
import { API_ENDPOINTS } from '@/lib/endpoints';
import { Job } from '@/lib/types/jobsScanner.types';
import { GenericRecord } from '@/lib/types/types';
import { MouseEventHandler } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { AxiosAPI } from '@/lib/api/axios.api';
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
    const curUserID = userID || '';
    let result;
    try {
      //Check if the job exist in the jobsTrackMap. If it doesn't add it. Otherwise delete it.
      if (!jobsTrackMap[job.jobID]) result = await createNewJobTracking(curUserID, job);
      else result = await deleteJobTracking(curUserID, job.jobID);

      //Update the user profile.
      await mutate(`/${API_ENDPOINTS.USERS}/${curUserID}`).then((el) => console.log(el));

      //Fire a toast.
      toast(result.data.message);
    } catch (error) {
      toast(AxiosAPI.handleError(error).message);
    }
  };
};
