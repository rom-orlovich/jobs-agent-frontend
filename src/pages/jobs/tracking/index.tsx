import JobsTracking from '@/components/JobTrackingPage/JobsTracking';
import PageHead from '@/components/Layout/PageHead/PageHead';
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
