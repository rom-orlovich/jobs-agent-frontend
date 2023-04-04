import JobsTracking from '@/components/JobTrackingPage/JobsTracking';
import PageHead from '@/components/Layout/PageHead/PageHead';
import { getInitialUserProfile } from '@/lib/getInitialUserProfile';
import { GetServerSidePropsContext } from 'next';
import React from 'react';

//Get the initial user profile before the client load.
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return getInitialUserProfile(ctx);
}
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
