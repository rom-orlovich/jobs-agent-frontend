import { Job } from '@/lib/jobsScanner.types';
import { UserProfileWithOneUserQuery } from '@/lib/types/api.types';
import { GenericRecord } from '@/lib/types/types';
import { createNewJobTracking, deleteJobTracking } from '@/lib/user.utils';

import React, { MouseEventHandler } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import JobItem from './JobItem';
import JobTrackingItem from './JobTrackingItem';
export const jobItemStyle = {
  item: 'flex flex-[100%] flex-col justify-between rounded-md bg-white p-4 shadow-lg sm:flex-[45%] md:flex-[30%] ',
  content: 'flex gap-2 flex-col',
  bookmarkContainer: 'flex w-full justify-end',
  bookmarkButton: 'text-base',
  buttonStatusContainer: 'flex justify-center mt-3'
};

/**
 * @param tracking Array of the jobs info from user profile data.
 * @returns {GenericRecord<TrackInfo>} A obj that the indexes are the jobID and the values are the tracking object.
 */
const createJobsTrackMap = (tracking: Job[]): GenericRecord<Job> => {
  const JobTrackingMap: GenericRecord<Job> = {};
  tracking?.forEach((jobTracking) => (JobTrackingMap[`${jobTracking.jobID}`] = jobTracking));
  return JobTrackingMap;
};

interface JobsFeedProps {
  jobs?: Job[];
  userProfileData: UserProfileWithOneUserQuery;
  isTrackFeed?: boolean;
  saveSessionValues?: () => void;
}

const jobsFeedStyle = {
  feed: 'flex h-full flex-wrap justify-center gap-3 py-4 xs:px-8 xs:pr-16'
};

function JobsFeed({ jobs, userProfileData, isTrackFeed, saveSessionValues }: JobsFeedProps) {
  const jobsTrackMap = createJobsTrackMap(userProfileData.tracking || []);

  const handleClickBookmark: (job: Job) => MouseEventHandler<HTMLButtonElement> = (job: Job) => {
    return async (e) => {
      e.preventDefault();
      let result;
      //Check if the job exist in the jobsTrackMap. If it doesn't add it. Otherwise delete it.
      if (!jobsTrackMap[job.jobID])
        result = await createNewJobTracking(userProfileData.userID || '', job);
      else result = await deleteJobTracking(userProfileData.userID || '', job.jobID);
      saveSessionValues && saveSessionValues();
      //Update the user profile.
      await mutate(`/api/users/${userProfileData?.userID}`).then((el) => console.log(el));

      //Fire a toast.
      toast(result?.message);
    };
  };
  let currentJobs;
  if (isTrackFeed) currentJobs = userProfileData.tracking;
  else currentJobs = jobs;
  return (
    <ul dir="ltr" className={jobsFeedStyle.feed}>
      {currentJobs?.map((job, i) => {
        const jobItemProps = {
          ...job,
          mark: !!jobsTrackMap[job?.jobID],
          key: job.jobID + i,
          index: i,
          handleClickBookmark: handleClickBookmark(job)
        };

        return isTrackFeed ? <JobTrackingItem {...jobItemProps} /> : <JobItem {...jobItemProps} />;
      })}
    </ul>
  );
}

export default JobsFeed;
