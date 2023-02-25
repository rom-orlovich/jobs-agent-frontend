import useRedirectHome from '@/hooks/useRedirctHome';

import { checkIsJobsFoundWithToast, createJobsURl, jobsFetcher } from '@/lib/jobs.utils';
import { ResponseGetJobs } from '@/lib/jobsScanner.types';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';

import React from 'react';

import { authOptions } from '../api/auth/[...nextauth]';
import useSWRInfinite from 'swr/infinite';
import { useAuthContext } from '@/context/UserContext';

import JobsFeed from '@/components/Jobs/JobsFeed';

export const getServerSideProps: GetServerSideProps<ResponseGetJobs> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  const hash = context.query.hash;

  const data = await jobsFetcher(session?.user.id || '', {
    hash
  });
  const defaultResponseJob: ResponseGetJobs = {
    jobs: [],
    pagination: {
      hasMore: false,
      totalDocs: 0,
      totalPages: 1
    }
  };

  return {
    props: data || defaultResponseJob
  };
};
function Jobs({ jobs }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useRedirectHome(() => checkIsJobsFoundWithToast(jobs));
  const { userProfileData } = useAuthContext();

  const { data } = useSWRInfinite<ResponseGetJobs>((prePage) =>
    createJobsURl(userProfileData.userID || '', {
      page: prePage
    })
  );
  const curData = data
    ? data[0]
    : {
        jobs: []
      };
  return <JobsFeed jobs={curData.jobs} />;
}

export default Jobs;
