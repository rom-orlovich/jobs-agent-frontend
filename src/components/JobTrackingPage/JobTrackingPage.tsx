import { useAuthContext } from '@/context/AuthContext';
import useRedirect from '@/hooks/useRedirect';
import { createToastsByDataIfExist } from '@/lib/utils';
import React from 'react';
import JobsFeed from '../JobsPage/JobFeed/JobsFeed';

function JobTrackingPage() {
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
    <div className="pl-4 pr-12 xs:pr-20">
      <JobsFeed userProfileData={userProfileData} isTrackingFeed={true} />
    </div>
  );
}

export default JobTrackingPage;
