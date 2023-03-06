import { Job } from '@/lib/types/jobsScanner.types';
import { UserProfileWithOneUserQuery } from '@/lib/types/api.types';

import React, { MouseEventHandler } from 'react';

import JobItem from './JobItem/JobItem';
import JobTrackingItem from './JobItem/JobTrackingItem';
import { createJobsTrackingMap, handleClickBookmark } from './utils';
import ScrollUpButton from '@/components/Buttons/ScrollUpButton';
import { classIsOn } from '@/lib/utils';

export const jobItemStyle = {
  item: 'card flex-[100%] p-4 sm:max-w-[35%] sm:flex-[45%] md:flex-[30%] ',
  content: 'flex gap-4 flex-col ',
  bookmarkContainer: 'flex w-full justify-end',
  bookmarkButton: 'text-base',
  title: 'font-semibold hover:opacity-70 ',
  reason: 'text-center text-lg',
  matchColor: 'text-status-500 font-semibold',
  noMatchColor: 'text-error-500'
};
const jobsFeedStyle = {
  feed: 'flex h-full flex-wrap justify-center gap-3 py-4'
};

interface JobsFeedProps {
  jobs?: Job[];
  userProfileData: UserProfileWithOneUserQuery;
  isTrackFeed?: boolean;
  saveSessionValues?: () => void;
}

export type JobItemProps = Job & {
  index: number;
  handleClickBookmark: MouseEventHandler<HTMLButtonElement>;
  mark: boolean;
  isMatch: boolean;
  reasonStyle: string;
  key: string;
};

function JobsFeed({ jobs, userProfileData, isTrackFeed }: JobsFeedProps) {
  //Create Jobs map
  const jobsTrackMap = createJobsTrackingMap(userProfileData?.tracking || []);
  //Handle the click on track button.
  const handleClickBookmarkFun = handleClickBookmark(jobsTrackMap, userProfileData?.userID);

  let currentJobs;
  if (isTrackFeed) currentJobs = userProfileData.tracking;
  else currentJobs = jobs;

  return (
    <>
      <ul dir="ltr" className={jobsFeedStyle.feed}>
        {currentJobs?.map((job, i) => {
          const isMatch = job.reason === 'match';
          const jobItemProps: JobItemProps = {
            ...job,
            mark: !!jobsTrackMap[job?.jobID],
            key: job?.jobID + i,
            index: i,
            handleClickBookmark: handleClickBookmarkFun(job),
            reasonStyle: classIsOn(isMatch, jobItemStyle.matchColor, jobItemStyle.noMatchColor),
            isMatch
          };

          return isTrackFeed ? <JobTrackingItem {...jobItemProps} /> : <JobItem {...jobItemProps} />;
        })}
      </ul>
      <ScrollUpButton />
    </>
  );
}

export default JobsFeed;
