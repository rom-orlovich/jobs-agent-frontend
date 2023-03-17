// import JobsFeed from '@/components/JobsPage/JobFeed/JobsFeed';
import JobTrackingPage from '@/components/JobTrackingPage/JobTrackingPage';

import PageHead from '@/components/Layout/PageHead/PageHead';

// import { useAuthContext } from '@/context/AuthContext';
// import useRedirect from '@/hooks/useRedirect';

// import { createToastsByDataIfExist } from '@/lib/utils';
import React from 'react';

function Track() {
  return (
    <>
      <PageHead
        title="Jobs Tracking"
        description="Here is the place to find all the jobs which are in your tracking."
      />

      <JobTrackingPage />
    </>
  );
}

export default Track;
