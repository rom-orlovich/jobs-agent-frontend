/* eslint-disable @typescript-eslint/no-explicit-any */
import { checkIsJobsFoundWithToast, defaultResponseJobs, swrInfiniteHandler } from '@/lib/jobs.utils';
import { ResponseGetJobs } from '@/lib/jobsScanner.types';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';

import React from 'react';

import { authOptions } from '../api/auth/[...nextauth]';
import useSWRInfinite from 'swr/infinite';
import { useAuthContext } from '@/context/AuthContext';

import PageHead from '@/components/Layout/PageHead/PageHead';

import useFilterJobs from '@/hooks/useFilterJobs';
import useRedirect from '@/hooks/useRedirect';
import { getJobs } from '@/lib/api/jobs.util';
import Jobs from '@/components/JobsPage/Jobs';

export const getServerSideProps: GetServerSideProps<ResponseGetJobs> = async (context) => {
  //Get current session data.
  const session = await getServerSession(context.req, context.res, authOptions);
  //Get the query from the url.
  const hash = context.query.hash;
  const page = context.query.page;
  //Fetch the the jobs.
  const data = await getJobs<ResponseGetJobs>(session?.user.id || '', {
    hash,
    page: page
  });
  return {
    props: data?.data || defaultResponseJobs
  };
};

function JobsPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { jobs } = props;

  //Redirect to home page if no jobs were found.
  useRedirect(() => checkIsJobsFoundWithToast(jobs));

  //Get filter Jobs query props.
  const filterJobsProps = useFilterJobs();
  const title = filterJobsProps.formValues.title;
  const reason = filterJobsProps.formValues.reason;
  //Get user profile data.
  const { userProfileData } = useAuthContext();

  //Use swr infinite.
  const useSwrInfiniteProps = useSWRInfinite<ResponseGetJobs>(
    swrInfiniteHandler(userProfileData, {
      title: title,
      reason: reason
    }),
    {
      revalidateIfStale: true,
      revalidateFirstPage: false,
      revalidateOnFocus: false,
      refreshWhenOffline: false,
      revalidateOnMount: false,
      revalidateAll: false,
      fallbackData: [props]
    }
  );

  return (
    <>
      <PageHead title="Jobs" description="Here is the place to find your next job." />
      <Jobs
        filterJobsProps={filterJobsProps}
        useSwrInfiniteProps={useSwrInfiniteProps}
        userProfileData={userProfileData}
      />
    </>
  );
}

export default JobsPage;
