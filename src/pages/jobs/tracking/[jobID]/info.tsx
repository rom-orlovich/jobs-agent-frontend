import { checkIsJobFoundWithToast } from '@/components/JobsPage/utils';
import JobTrackingForm from '@/components/JobTrackingForm/JobTrackingForm';
import PageHead from '@/components/Layout/PageHead/PageHead';
import { useAuthContext } from '@/context/AuthContext';

import useRedirect from '@/hooks/useRedirect';

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
  formContainer: 'flex justify-center w-full h-full pr-8',
  card: 'card min-w-[20rem] sm:min-w-[23rem] max-w-[25rem] min-h-[28rem]  p-8',
  title: 'text-2xl underline',
  company: 'text-xl underline mt-2'
};

function JobTracking() {
  const jobTrackingData = useGetJobsTrackingInfo();
  const jobTracking = jobTrackingData?.curJobTracking;
  const job = useRedirect(() => checkIsJobFoundWithToast(jobTracking));

  if (!job) return <></>;
  const { curJobTracking } = jobTrackingData;

  return (
    <>
      <PageHead
        title="Jobs Tracking Info"
        description="Here is the place to fill details how you progress with the jobs you found."
      />
      <div className={infoStyle.formContainer}>
        <div className={infoStyle.card}>
          <h1 dir={'ltr'} className={infoStyle.title}>
            <Link href={curJobTracking?.link || ''}>{curJobTracking?.title} </Link>
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
