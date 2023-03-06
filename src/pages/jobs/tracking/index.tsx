import JobsFeed from '@/components/JobsPage/JobFeed/JobsFeed';

import PageHead from '@/components/Layout/PageHead/PageHead';

import { useAuthContext } from '@/context/AuthContext';
import useRedirect from '@/hooks/useRedirect';

import { createToastsByDataIfExist } from '@/lib/utils';
import React from 'react';

function Track() {
  //Get user profile data.
  const { userProfileData } = useAuthContext();

  //Check if the the exist and redirect to home page and display proper message.
  useRedirect(
    createToastsByDataIfExist(
      'TRACKING_JOBS_ARE_FOUND',
      'TRACKING_JOBS_ARE_NOT_FOUND',
      userProfileData?.tracking
    )
  );
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
