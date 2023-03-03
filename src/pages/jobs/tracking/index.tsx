import JobsFeed from '@/components/JobsPage/JobFeed/JobsFeed';
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
      <div className="pr-10 xs:pr-16">
        <JobsFeed userProfileData={userProfileData} isTrackFeed={true} />;
      </div>
    </>
  );
}

export default Track;
