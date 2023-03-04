import JobsFeed from '@/components/JobsPage/JobFeed/JobsFeed';

import PageHead from '@/components/Layout/PageHead/PageHead';

import { useAuthContext } from '@/context/AuthContext';
import useRedirect from '@/hooks/useRedirect';
import { Job } from '@/lib/types/jobsScanner.types';
import { createToastCBWithData } from '@/lib/utils';
import React from 'react';

export const checkIsJobFoundWithToast = (jobs?: Job[]) => {
  try {
    console.log(jobs);
    if (jobs?.length === 0) return createToastCBWithData(undefined, 'TRACKING_JOBS_ARE_NOT_FOUND');
    return createToastCBWithData(jobs, 'TRACKING_JOBS_ARE_FOUND');
  } catch (error) {
    return createToastCBWithData(undefined, 'SOMETHING_WRONG');
  }
};

function Track() {
  //Get user profile data.
  const { userProfileData } = useAuthContext();

  useRedirect(() => checkIsJobFoundWithToast(userProfileData.tracking));
  return (
    <>
      <PageHead
        title="Jobs Tracking"
        description="Here is the place to find all the jobs which are in your tracking."
      />
      <div className="pl-4 pr-12 xs:pr-20">
        <JobsFeed userProfileData={userProfileData} isTrackFeed={true} />
      </div>
    </>
  );
}

export default Track;
