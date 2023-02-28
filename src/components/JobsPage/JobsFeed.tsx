import { Job } from '@/lib/jobsScanner.types';
import { UserProfileWithOneUserQuery } from '@/lib/types/api.types';

import React, { MouseEventHandler } from 'react';
import JobItem from './JobItem';
interface JobsFeedProps {
  jobs: Job[];
  userProfileData: UserProfileWithOneUserQuery;
}
function JobsFeed({ jobs, userProfileData }: JobsFeedProps) {
  const handleClickBookmark: (
    userID: string,
    jobID: string
  ) => MouseEventHandler<HTMLButtonElement> = () => {
    return (e) => {
      e.preventDefault();
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
            handleClickBookmark={handleClickBookmark(userProfileData?.userID || '', job.jobID)}
          />
        );
      })}
    </ul>
  );
}

export default JobsFeed;
