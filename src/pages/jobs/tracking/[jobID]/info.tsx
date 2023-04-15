import JobTrackingForm from '@/components/JobTrackingForm/JobTrackingForm';
import { handleSaveObservedJob } from '@/components/JobsPage/JobFeed/utils';
import PageHead from '@/components/Layout/PageHead/PageHead';
import { useAuthContext } from '@/context/AuthContext';

import useRedirect from '@/hooks/useRedirect';
import { createToastsByDataIfExist } from '@/lib/utils';

import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { getServerSideProps } from '@/lib/getInitialUserProfile';
//Get the initial user profile before the client load.
export { getServerSideProps };

/**
 * The hooks find and return current user profile data and the requested job.
 */
export const useGetJobTrackingFormInfo = () => {
  const router = useRouter();
  const { userProfileData } = useAuthContext();
  const jobID = String(router.query.jobID);
  const currentJobTrackingInfo = userProfileData.tracking?.find(
    (jobTracking) => jobTracking.jobID === jobID
  );
  return {
    currentJobTrackingInfo,
    userProfileData
  };
};

export const infoStyle = {
  formContainer: 'mt-[10vh] flex min-h-[75vh] flex-col items-center justify-center pr-[3rem] xs:h-full',
  card: 'card min-w-[17.5rem] sm:min-w-[23rem]  xs:max-w-[25rem] max-w-[20rem]  min-h-[23rem] p-6',
  title: 'text-2xl underline mt-2',
  company: 'text-xl underline my-2'
};

function JobTracking() {
  const jobTrackingData = useGetJobTrackingFormInfo();
  const { currentJobTrackingInfo, userProfileData } = jobTrackingData;
  //Check the status of the data and display proper message.
  //If The data it not exist, redirect to the home page.
  const job = useRedirect(
    createToastsByDataIfExist('TRACKING_JOB_IS_FOUND', 'TRACKING_JOB_NOT_FOUND', currentJobTrackingInfo)
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
            <Link
              onClick={handleSaveObservedJob(job.jobID, userProfileData.userID)}
              target="_blank"
              href={currentJobTrackingInfo?.link || ''}
            >
              {currentJobTrackingInfo?.title}
            </Link>
          </h1>
          <h2 className={infoStyle.company} dir={'ltr'}>
            {currentJobTrackingInfo?.company}
          </h2>
          <JobTrackingForm job={job} userID={jobTrackingData.userProfileData.userID || ''} />
        </div>
      </div>
    </>
  );
}

export default JobTracking;
