import { Job } from '@/lib/jobsScanner.types';
import { UserProfileWithOneUserQuery } from '@/lib/types/api.types';
import { GenericRecord } from '@/lib/types/types';
import { createNewJobTrack, deleteJobTrack } from '@/lib/user.utils';

import React, { MouseEventHandler } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import JobItem from './JobItem';

/**
 * @param jobsTrack Array of the jobs track from user profile data.
 * @returns {GenericRecord<TrackInfo>} A obj that the indexes are the jobID and the values are the jobsTrack object.
 */
const createJobsTrackMap = (jobsTrack: Job[]): GenericRecord<Job> => {
  const JobTrackMap: GenericRecord<Job> = {};
  jobsTrack?.forEach((jobTrack) => (JobTrackMap[`${jobTrack.jobID}`] = jobTrack));
  return JobTrackMap;
};

interface JobsFeedProps {
  jobs: Job[];
  userProfileData: UserProfileWithOneUserQuery;
  isTrackFeed?: boolean;
}

const jobsFeedStyle = {
  feed: 'flex h-full flex-wrap justify-center gap-2 py-4 xs:px-8 xs:pr-16'
};

function JobsFeed({ jobs, userProfileData, isTrackFeed }: JobsFeedProps) {
  const jobsTrackMap = createJobsTrackMap(userProfileData.jobsTrack || []);

  const handleClickBookmark: (job: Job) => MouseEventHandler<HTMLButtonElement> = (job: Job) => {
    return async (e) => {
      e.preventDefault();
      let result;
      //Check if the job exist in the jobsTrackMap. If it doesn't add it. Otherwise delete it.
      if (!jobsTrackMap[job.jobID]) result = await createNewJobTrack(userProfileData.userID || '', job);
      else result = await deleteJobTrack(userProfileData.userID || '', job.jobID);
      //Update the user profile.
      await mutate(`/api/users/${userProfileData?.userID}`).then((el) => console.log(el));

      //Fire a toast.
      toast(result?.message);
    };
  };
  let currentJobs;
  if (isTrackFeed) currentJobs = userProfileData.jobsTrack;
  else currentJobs = jobs;

  return (
    <ul dir="ltr" className={jobsFeedStyle.feed}>
      {currentJobs?.map((job, i) => {
        return (
          <JobItem
            {...job}
            mark={!!jobsTrackMap[job.jobID]}
            key={job.jobID + i}
            index={i}
            handleClickBookmark={handleClickBookmark(job)}
          />
        );
      })}
    </ul>
  );
}

export default JobsFeed;
