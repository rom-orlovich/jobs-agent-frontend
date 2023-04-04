import { Job } from '@/lib/types/jobsScanner.types';
import { UserProfileWithOneUserQuery } from '@/lib/types/user.types';

import React, { MouseEventHandler } from 'react';

import JobItem from './JobItem/JobItem';

import { createJobsTrackingMap, handleClickBookmark } from './utils';
import ScrollUpButton from '@/components/Buttons/ScrollUpButton';
import { capitalFirstLetter, classIsOn, classNameGenerator } from '@/lib/utils';
import JobTrackingItem from '@/components/JobTrackingPage/JobTrackingItem/JobTrackingItem';
export const jobItemStyle = {
  item: 'card flex-[100%] p-4 md:max-w-[32%] md:flex-[33%]  sm:max-w-[45%] sm:flex-[45%]',
  content: 'flex flex-col h-full justify-between gap-3',
  bookmarkContainer: 'mb-4 flex w-full justify-between',
  bookmarkButton: 'text-base',
  from: 'text-white card rounded-md p-[0.3rem] px-2 text-sm hover:opacity-80',
  title: 'font-bold hover:opacity-70 text-lg text-center',
  reason: 'text-center text-lg hover:opacity-70 cursor-pointer ',
  matchColor: 'text-[#48e76a]',
  noMatchColor: 'text-[#6188c7]'
};
export const jobsFeedStyle = {
  feed: 'flex h-full flex-wrap justify-center gap-3 py-4'
};

export const tagColorStyle = {
  allJobs: 'bg-orange-400 hover:opacity-80',
  gotFriends: 'bg-green-400',
  linkedin: 'bg-blue-400',
  drushim: 'bg-orange-400'
};

export interface JobsFeedProps {
  jobs?: Job[];
  userProfileData: UserProfileWithOneUserQuery;
  isTrackingFeed?: boolean;
}

export type JobItemProps = Job & {
  index: number;
  handleClickBookmark: MouseEventHandler<HTMLButtonElement>;
  handleAddUserObserveList: MouseEventHandler<HTMLAnchorElement>;
  mark: boolean;
  isMatch: boolean;
  reasonStyle: string;
  key: string;
  fromClass: string;
};

function JobsFeed({ jobs, userProfileData, isTrackingFeed }: JobsFeedProps) {
  //Create Jobs map.
  const jobsTrackMap = createJobsTrackingMap(userProfileData?.tracking || []);

  //Handle the click on track button.
  const handleClickBookmarkFun = handleClickBookmark(jobsTrackMap, userProfileData?.userID);
  //Handle add to observed list
  const handleAddUserObserveList: (jobsID: string) => MouseEventHandler<HTMLAnchorElement> =
    (jobsID: string) => () => {
      console.log(jobsID);
    };

  return (
    <>
      <ul dir="ltr" className={jobsFeedStyle.feed}>
        {jobs?.map((job, i) => {
          const isMatch = job.reason === 'match';
          const from = job.from as keyof typeof tagColorStyle;
          const jobItemProps: JobItemProps = {
            ...job,
            handleAddUserObserveList: handleAddUserObserveList(job.jobID),
            handleClickBookmark: handleClickBookmarkFun(job),
            mark: !!jobsTrackMap[job?.jobID],
            key: job?.jobID + i,
            index: i,
            reasonStyle: classIsOn(isMatch, jobItemStyle.matchColor, jobItemStyle.noMatchColor),
            isMatch,
            from: capitalFirstLetter(job.from),
            fromClass: classNameGenerator(jobItemStyle.from, tagColorStyle[from])
          };

          return isTrackingFeed ? <JobTrackingItem {...jobItemProps} /> : <JobItem {...jobItemProps} />;
        })}
      </ul>
      <ScrollUpButton />
    </>
  );
}

export default JobsFeed;
