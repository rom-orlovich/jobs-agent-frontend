/* eslint-disable @typescript-eslint/no-explicit-any */

import { ResponseGetJobs } from '@/lib/types/jobsScanner.types';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';

import React from 'react';

import { authOptions } from '../api/auth/[...nextauth]';
import PageHead from '@/components/Layout/PageHead/PageHead';

import { getJobs } from '@/lib/api/jobs.util';
import Jobs from '@/components/JobsPage/Jobs';
import { APP_ROUTES } from '@/lib/routes';
import { isJobsMatchesPage } from '@/components/JobsPage/utils';
import { defaultResponseJobs } from '@/components/JobsPage/utils';
export const getServerSideProps: GetServerSideProps<ResponseGetJobs> = async (context) => {
  //Get current session data.
  const session = await getServerSession(context.req, context.res, authOptions);
  //Get the query from the url.
  const hash = context.query.hash;
  const page = context.query.page;
  //Fetch the the jobs.
  const data = await getJobs<ResponseGetJobs>(session?.user.id || '', {
    hash,
    page: page,
    ...isJobsMatchesPage(context.resolvedUrl.includes(`/${APP_ROUTES.JOBS_MATCH}`))
  });
  return {
    props: data?.data || defaultResponseJobs
  };
};

function JobsPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <PageHead title="Jobs" description="Here is the place to find your next job." />

      <Jobs initialsProps={props} />
    </>
  );
}

export default JobsPage;
