import { Job } from '@/lib/jobsScanner.types';
import { TrackInfo, UserProfileWithOneUserQuery } from '@/lib/types/api.types';
import { GenericRecord } from '@/lib/types/types';
import { createNewJobTrack, deleteJobTrack } from '@/lib/user.utils';

import React, { MouseEventHandler } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import JobItem from './JobItem';
interface JobsFeedProps {
  jobs: Job[];
  userProfileData: UserProfileWithOneUserQuery;
}

/**
 * @param jobsTrack Array of the jobs track from user profile data.
 * @returns {GenericRecord<TrackInfo>} A obj that the indexes are the jobID and the values are the jobsTrack object.
 */
const createJobsTrackMap = (jobsTrack: TrackInfo[]) => {
  const JobTrackMap: GenericRecord<TrackInfo> = {};
  jobsTrack?.forEach((jobTrack) => (JobTrackMap[`${jobTrack.jobID}`] = jobTrack));
  return JobTrackMap;
};

function JobsFeed({ jobs, userProfileData }: JobsFeedProps) {
  const jobsTrackMap = createJobsTrackMap(userProfileData.track || []);

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
  return (
    <ul dir="ltr" className="flex h-full flex-wrap justify-center gap-2 py-4 xs:px-8 xs:pr-16">
      {jobs?.map((job, i) => {
        return (
          <JobItem
            mark={!!jobsTrackMap[job.jobID]}
            key={job.jobID + i}
            {...job}
            index={i}
            handleClickBookmark={handleClickBookmark(job)}
          />
        );
      })}
    </ul>
  );
}

export default JobsFeed;
