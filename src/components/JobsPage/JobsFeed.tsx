import { Job } from '@/lib/jobsScanner.types';
import { UserProfileWithOneUserQuery } from '@/lib/types/api.types';
import { createJobTrack } from '@/lib/user.utils';

import React, { MouseEventHandler } from 'react';
import JobItem from './JobItem';
interface JobsFeedProps {
  jobs: Job[];
  userProfileData: UserProfileWithOneUserQuery;
}

function JobsFeed({ jobs, userProfileData }: JobsFeedProps) {
  const handleClickBookmark: (job: Job) => MouseEventHandler<HTMLButtonElement> = (job: Job) => {
    return async (e) => {
      e.preventDefault();
      const res = await createJobTrack(userProfileData.userID || '', job);
      console.log(res);
      // mutate(`/api/users/${userProfileData?.userID}`,{track:[{jobID,sendCV:}]})
    };
  };

  return (
    <ul dir="ltr" className="flex h-full flex-wrap justify-center gap-2 py-4 xs:px-8 xs:pr-16">
      {jobs?.map((job, i) => {
        return (
          <JobItem
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
