import JobTrackingForm from '@/components/JobTrackingForm/JobTrackingForm';
import { useAuthContext } from '@/context/AuthContext';

import useRedirect from '@/hooks/useRedirect';

import { checkIsJobFoundWithToast } from '@/lib/jobs.utils';
// import useForm from '@/hooks/useForm';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export const useGetJobsTrack = () => {
  const router = useRouter();
  const { userProfileData } = useAuthContext();

  const jobID = String(router.query.jobID);

  const curJobTracking = userProfileData.tracking?.find((jobTracking) => jobTracking.jobID === jobID);
  return {
    curJobTracking,
    userProfileData
  };
};
const jobTrackingFormStyle = {
  formContainer: 'flex justify-center w-full h-full ',
  card: 'card min-w-[23rem] max-w-[25rem] min-h-[28rem]  p-8',
  title: 'text-2xl underline',
  company: 'text-xl underline mt-2',
  form: 'flex flex-col mt-4   max-h-[30rem] min-h-[15rem] justify-between relative',
  formContent: 'flex flex-col gap-8 ',
  headingToggle: 'text-xl',
  buttonsContainer: 'flex justify-between w-full ',
  label: 'flex flex-col ',
  dateInput: 'max-w-[8rem]',
  toggleTopicWrapper: 'flex gap-1'
};
function JobTracking() {
  // const router = useRouter();
  const jobTrackingData = useGetJobsTrack();
  const jobTracking = jobTrackingData?.curJobTracking;
  const job = useRedirect(() => checkIsJobFoundWithToast(jobTracking));

  if (!job) return <></>;
  const { curJobTracking } = jobTrackingData;
  return (
    <div className={jobTrackingFormStyle.formContainer}>
      <div className={jobTrackingFormStyle.card}>
        <h1 dir={'ltr'} className={jobTrackingFormStyle.title}>
          <Link href={curJobTracking?.link || ''}>{curJobTracking?.title} </Link>
        </h1>
        <h2 className={jobTrackingFormStyle.company} dir={'ltr'}>
          {curJobTracking?.company}
        </h2>
        <JobTrackingForm job={job} userID={jobTrackingData.userProfileData.userID || ''} />
      </div>
    </div>
  );
}

export default JobTracking;
