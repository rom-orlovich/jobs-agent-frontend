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
import { useAuthContext } from '@/context/AuthContext';

import JobsFeed from '@/components/JobsPage/JobsFeed';

import Spinner from '@/components/Spinner/Spinner';
import { UserProfileWithOneUserQuery } from '@/lib/types/api.types';
import LoadButton from '@/components/Buttons/LoadButton';
import PageHead from '@/components/Layout/PageHead/PageHead';
import JobsSearch from '@/components/JobsPage/JobsSearch/JobsSearch';
import useFilterJobs from '@/hooks/useFilterJobs/useFilterJobs';
import { GenericRecord } from '@/lib/types/types';

const handler: (
  userProfileData: UserProfileWithOneUserQuery,
  params?: GenericRecord<any>
) => SWRInfiniteKeyLoader<ResponseGetJobs, string | null> =
  (userProfileData, params) => (prePage: number, preData) => {
    if (preData?.pagination.hasMore === false) return null;

    return createJobsURl(userProfileData.userID || '', {
      page: prePage + 1,
      hash: userProfileData.activeHash,
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

  console.log(data);

  return {
    props: data || defaultResponseJobs
  };
};

function Jobs(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { jobs } = props;

  //Redirect to home page if no jobs were found.
  useRedirectHome(() => checkIsJobsFoundWithToast(jobs));

  const filterJobsProps = useFilterJobs();
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
      revalidateIfStale: true,
      revalidateFirstPage: false,
      revalidateOnFocus: false,
      refreshWhenOffline: false,
      revalidateAll: false,
      fallbackData: [props]
    }
  );

  const { allResponseData, lastResponse } = getLastCurJobData(data);

  const jobsData = allResponseData.map((response) => response.jobs).flat(1);

  return (
    <>
      <PageHead title="Jobs" description="Here is the place to find your next job." />
      <div className="flex justify-between px-8 pr-16 xs:flex-col  sm:flex-col">
        <h1 className="text-3xl">כ- {lastResponse.pagination.numResultsFound} משרות נמצאו:</h1>
        <JobsSearch filterJobsProps={filterJobsProps} jobsFilters={lastResponse.filters} />
      </div>

      <JobsFeed jobs={jobsData} />

      {jobsData.length && (
        <div className="flex w-full items-center justify-center">
          <LoadButton
            disabled={!lastResponse.pagination.hasMore}
            className="items-center px-7 py-2 text-2xl"
            onClick={() => {
              setSize(size + 2);
            }}
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
