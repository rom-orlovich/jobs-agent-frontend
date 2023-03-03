// import { createNewJobTracking, deleteJobTracking } from '@/lib/api/jobsTracking.utils';
import { Job } from '@/lib/types/jobsScanner.types';
import { UserProfileWithOneUserQuery } from '@/lib/types/api.types';
import { GenericRecord } from '@/lib/types/types';
import React from 'react';
// import { toast } from 'react-toastify';
// import { mutate } from 'swr';
import JobItem from './JobItem/JobItem';
import JobTrackingItem from './JobItem/JobTrackingItem';
import { handleClickBookmark } from './utils';

export const jobItemStyle = {
  item: 'card flex-[100%] p-4 sm:flex-[45%] md:flex-[35%]',
  content: 'flex gap-2 flex-col',
  bookmarkContainer: 'flex w-full justify-end',
  bookmarkButton: 'text-base'
};

interface JobsFeedProps {
  jobs?: Job[];
  userProfileData: UserProfileWithOneUserQuery;
  isTrackFeed?: boolean;
  saveSessionValues?: () => void;
}

/**
 * @param tracking Array of the jobs info from user profile data.
 * @returns {GenericRecord<TrackingInfo>} A obj that the indexes are the jobID and the values are the tracking object.
 */
const createJobsTrackMap = (tracking: Job[]): GenericRecord<Job> => {
  const JobTrackingMap: GenericRecord<Job> = {};
  tracking?.forEach((jobTracking) => (JobTrackingMap[`${jobTracking.jobID}`] = jobTracking));
  return JobTrackingMap;
};

const jobsFeedStyle = {
  feed: 'flex h-full flex-wrap justify-center gap-3 py-4'
};
function JobsFeed({ jobs, userProfileData, isTrackFeed }: JobsFeedProps) {
  const jobsTrackMap = createJobsTrackMap(userProfileData.tracking || []);

  // const handleClickBookmark: (job: Job, userID?: string) => MouseEventHandler<HTMLButtonElement> = (
  //   job,
  //   userID
  // ) => {
  //   return async (e) => {
  //     e.preventDefault();
  //     let result;
  //     //Check if the job exist in the jobsTrackMap. If it doesn't add it. Otherwise delete it.
  //     if (!jobsTrackMap[job.jobID]) result = await createNewJobTracking(userID || '', job);
  //     else result = await deleteJobTracking(userID || '', job.jobID);

  //     //Update the user profile.
  //     await mutate(`/api/users/${userProfileData?.userID}`).then((el) => console.log(el));
  //     console.log(result);
  //     //Fire a toast.
  //     toast(result.data.message);
  //   };
  // };
  const handleClickBookmarkFun = handleClickBookmark(jobsTrackMap, userProfileData?.userID);

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
          handleClickBookmark: handleClickBookmarkFun(job)
        };

        return isTrackFeed ? <JobTrackingItem {...jobItemProps} /> : <JobItem {...jobItemProps} />;
      })}
    </ul>
  );
}

export default JobsFeed;
