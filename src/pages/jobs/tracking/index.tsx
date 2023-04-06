import JobsTracking from '@/components/JobTrackingPage/JobsTracking';
import PageHead from '@/components/Layout/PageHead/PageHead';
import { getServerSideProps } from '@/lib/getInitialUserProfile';
//Get the initial user profile before the client load.
export { getServerSideProps };

import React from 'react';
function JobsTrackingPage() {
  return (
    <>
      <PageHead
        title="Jobs Tracking"
        description="Here is the place to find all the jobs which are in your tracking."
      />

      <JobsTracking />
    </>
  );
}

export default JobsTrackingPage;
