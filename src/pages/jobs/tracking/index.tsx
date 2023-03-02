import JobsFeed from '@/components/JobsPage/JobsFeed';
import PageHead from '@/components/Layout/PageHead/PageHead';
import { useAuthContext } from '@/context/AuthContext';
import React from 'react';

function Track() {
  //Get user profile data.
  const { userProfileData } = useAuthContext();

  return (
    <>
      <PageHead
        title="Jobs Tracking"
        description="Here is the place to find all the jobs which are in your tracking."
      />
      <JobsFeed userProfileData={userProfileData} isTrackFeed={true} />;
    </>
  );
}

export default Track;
