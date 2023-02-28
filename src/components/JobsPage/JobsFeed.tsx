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

function JobsFeed({ jobs, userProfileData }: JobsFeedProps) {
  const objTrack: GenericRecord<TrackInfo> = {};
  userProfileData.track?.forEach((el) => (objTrack[`${el.jobID}`] = el));
  const handleClickBookmark: (job: Job) => MouseEventHandler<HTMLButtonElement> = (job: Job) => {
    return async (e) => {
      e.preventDefault();
      if (!objTrack) {
        const res = await createNewJobTrack(userProfileData.userID || '', job);
        toast(res?.message);
      } else {
        const res = await deleteJobTrack(userProfileData.userID || '', job.jobID);
        toast(res?.message);
      }

      await mutate(`/api/users/${userProfileData?.userID}`).then((el) => console.log(el));
    };
  };
  return (
    <ul dir="ltr" className="flex h-full flex-wrap justify-center gap-2 py-4 xs:px-8 xs:pr-16">
      {jobs?.map((job, i) => {
        return (
          <JobItem
            mark={!!objTrack[job.jobID]}
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
