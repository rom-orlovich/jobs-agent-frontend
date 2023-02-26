/* eslint-disable @typescript-eslint/no-explicit-any */
import useRedirectHome from '@/hooks/useRedirctHome';

import {
  checkIsJobsFoundWithToast,
  createJobsURl,
  defaultResponseJobs,
  getLastCurJobData,
  jobsFetcher
} from '@/lib/jobs.utils';
import { ResponseGetJobs } from '@/lib/jobsScanner.types';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';

import React from 'react';

import { authOptions } from '../api/auth/[...nextauth]';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';
import { useAuthContext } from '@/context/UserContext';

import JobsFeed from '@/components/Jobs/JobsFeed';

import Spinner from '@/components/Spinner/Spinner';
import { UserProfileWithOneUserQuery } from '@/lib/types/api.types';
import LoadButton from '@/components/Buttons/LoadButton';
import PageHead from '@/components/Layout/PageHead/PageHead';
import JobsSearch from '@/components/Jobs/JobsSearch/JobsSearch';
import useFilterJobs from '@/hooks/useFilterJobs/useFilterJobs';
import { GenericRecord } from '@/lib/types/types';
const handler: (
  userProfileData: UserProfileWithOneUserQuery,
  params?: GenericRecord<any>
) => SWRInfiniteKeyLoader<ResponseGetJobs, string | null> =
  (userProfileData, params) => (prePage: number, preData) => {
    if (preData?.pagination.hasMore === false) return null;
    return createJobsURl(userProfileData.userID || '', {
      page: prePage,
      hash: userProfileData.userQuery.hash,
      ...params
    });
  };
export const getServerSideProps: GetServerSideProps<ResponseGetJobs> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  //Get the query from the url.
  const hash = context.query.hash;
  const page = context.query.page;

  const data = await jobsFetcher(session?.user.id || '', {
    hash,
    page: page
  });
  return {
    props: data || defaultResponseJobs
  };
};

function Jobs(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { jobs } = props;
  const filterJobsProps = useFilterJobs();
  //Redirect to home page if no jobs were found.
  useRedirectHome(() => checkIsJobsFoundWithToast(jobs));

  //Get user profile data.
  const { userProfileData } = useAuthContext();
  const title = filterJobsProps.formValues.title;
  const reason = filterJobsProps.formValues.reason;
  //Use swr infinite.
  const { data, isLoading, setSize, size, isValidating } = useSWRInfinite<ResponseGetJobs>(
    handler(userProfileData, {
      title: title,
      reason: reason
    }),
    {
      revalidateFirstPage: false,
      initialSize: filterJobsProps.formValues.page
    }
  );
  const { curData, lastData } = getLastCurJobData(data);
  const jobsData = curData.map((response) => response.jobs).flat(1);
  // if (title || reason) setSize(1);

  // const numJobs =
  //   size === 1 || (!title && !reason) ? lastData.pagination.totalDocs : lastData.jobs.length;

  return (
    <>
      <PageHead title="Jobs" description="Here is the place to find your next job." />

      <JobsSearch {...filterJobsProps} />

      <JobsFeed jobs={jobsData} />

      {jobsData.length && (
        <div className="flex w-full items-center justify-center">
          <LoadButton
            disabled={!lastData.pagination.hasMore}
            className="items-center px-7 py-2 text-2xl"
            onClick={() => setSize(size + 1)}
          >
            טען משרות
          </LoadButton>
        </div>
      )}

      <Spinner className="!top-[none] bottom-5" isLoading={isValidating || isLoading || !data} />
    </>
  );
}

export default Jobs;
