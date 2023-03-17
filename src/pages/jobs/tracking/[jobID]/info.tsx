import JobTrackingForm from '@/components/JobTrackingForm/JobTrackingForm';
import PageHead from '@/components/Layout/PageHead/PageHead';
import { useAuthContext } from '@/context/AuthContext';

import useRedirect from '@/hooks/useRedirect';
import { createToastsByDataIfExist } from '@/lib/utils';

import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

/**
 * The hooks find and return current user profile data and the requested job.
 */
export const useGetJobsTrackingInfo = () => {
  const router = useRouter();
  const { userProfileData } = useAuthContext();
  const jobID = String(router.query.jobID);
  const curJobTracking = userProfileData.tracking?.find((jobTracking) => jobTracking.jobID === jobID);
  return {
    curJobTracking,
    userProfileData
  };
};

export const infoStyle = {
  formContainer: 'mt-[10vh] flex min-h-[75vh] flex-col items-center justify-center pr-[3rem] xs:h-full',
  card: 'card min-w-[17.5rem] sm:min-w-[20rem]  xs:max-w-[25rem] max-w-[20rem]  min-h-[23rem] p-6',
  title: 'text-2xl underline mt-2',
  company: 'text-xl underline my-2'
};

function JobTracking() {
  const jobTrackingData = useGetJobsTrackingInfo();
  const { curJobTracking } = jobTrackingData;

  //Check the status of the data and display proper message.
  //If The data it not exist, redirect to the home page.
  const job = useRedirect(
    createToastsByDataIfExist('TRACKING_JOB_IS_FOUND', 'TRACKING_JOB_NOT_FOUND', curJobTracking)
  );

  return (
    <>
      <PageHead
        title="Jobs Tracking Info"
        description="Here is the place to fill details how you progress with the jobs you found."
      />
      <div className={infoStyle.formContainer}>
        <div className={infoStyle.card}>
          <h1 dir={'ltr'} className={infoStyle.title}>
            <Link target="_blank" href={curJobTracking?.link || ''}>
              {curJobTracking?.title}
            </Link>
          </h1>
          <h2 className={infoStyle.company} dir={'ltr'}>
            {curJobTracking?.company}
          </h2>
          <JobTrackingForm job={job} userID={jobTrackingData.userProfileData.userID || ''} />
        </div>
      </div>
    </>
  );
}

export default JobTracking;
