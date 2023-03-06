import { Job } from '@/lib/types/jobsScanner.types';
import { UserProfileWithOneUserQuery } from '@/lib/types/api.types';

import React, { MouseEventHandler } from 'react';

import JobItem from './JobItem/JobItem';
import JobTrackingItem from './JobItem/JobTrackingItem';
import { createJobsTrackingMap, handleClickBookmark } from './utils';
import ScrollUpButton from '@/components/Buttons/ScrollUpButton';
import { capitalFirstLetter, classIsOn, classNameGenerator } from '@/lib/utils';

export const jobItemStyle = {
  item: 'card flex-[100%] p-4 sm:max-w-[35%] sm:flex-[45%] md:flex-[30%] ',
  content: 'flex gap-6 flex-col ',
  bookmarkContainer: 'flex w-full justify-between',
  bookmarkButton: 'text-base',
  from: 'text-white card rounded-md p-[0.3rem] px-2 text-sm hover:opacity-80',
  title: 'font-bold hover:opacity-70 text-lg text-center',
  reason: 'text-center text-lg hover:opacity-70 cursor-pointer ',
  matchColor: 'text-[#48e76a]',
  noMatchColor: 'text-[#6188c7]'
};
const jobsFeedStyle = {
  feed: 'flex h-full flex-wrap justify-center gap-3 py-4'
};

const tagColorStyle = {
  allJobs: 'bg-orange-400 hover:opacity-80',
  gotFriends: 'bg-green-400',
  linkedin: 'bg-blue-400',
  drushim: 'bg-orange-400'
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
  fromClass: string;
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
          const from = job.from as keyof typeof tagColorStyle;
          const jobItemProps: JobItemProps = {
            ...job,
            mark: !!jobsTrackMap[job?.jobID],
            key: job?.jobID + i,
            index: i,
            handleClickBookmark: handleClickBookmarkFun(job),
            reasonStyle: classIsOn(isMatch, jobItemStyle.matchColor, jobItemStyle.noMatchColor),
            isMatch,
            from: capitalFirstLetter(job.from),
            fromClass: classNameGenerator(jobItemStyle.from, tagColorStyle[from])
          };

          return isTrackFeed ? <JobTrackingItem {...jobItemProps} /> : <JobItem {...jobItemProps} />;
        })}
      </ul>
      <ScrollUpButton />
    </>
  );
}

export default JobsFeed;
