import JobsFeed from '@/components/JobsPage/JobsFeed';
import { useAuthContext } from '@/context/AuthContext';
import React from 'react';

function Track() {
  //Get user profile data.

  const { userProfileData } = useAuthContext();

  return <JobsFeed userProfileData={userProfileData} isTrackFeed={true} />;
}

export default Track;
