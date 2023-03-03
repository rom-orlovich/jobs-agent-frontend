import { createNewJobTracking, deleteJobTracking } from '@/lib/api/jobsTracking.utils';
import { API_ENDPOINTS } from '@/lib/endpoints';
import { Job } from '@/lib/types/jobsScanner.types';
import { GenericRecord } from '@/lib/types/types';
import { MouseEventHandler } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

export const handleClickBookmark: (
  jobsTrackMap: GenericRecord<Job>,
  userID?: string
) => (job: Job) => MouseEventHandler<HTMLButtonElement> = (jobsTrackMap, userID) => (job) => {
  return async (e) => {
    e.preventDefault();
    const curUserID = userID || '';
    let result;
    //Check if the job exist in the jobsTrackMap. If it doesn't add it. Otherwise delete it.
    if (!jobsTrackMap[job.jobID]) result = await createNewJobTracking(curUserID, job);
    else result = await deleteJobTracking(curUserID, job.jobID);

    //Update the user profile.
    await mutate(`/${API_ENDPOINTS.USERS}/${curUserID}`).then((el) => console.log(el));
    console.log(result);
    //Fire a toast.
    toast(result.data.message);
  };
};
