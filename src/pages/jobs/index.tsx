/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  checkIsJobsFoundWithToast,
  defaultResponseJobs,
  getLastCurJobData,
  swrInfiniteHandler
} from '@/lib/jobs.utils';
import { ResponseGetJobs } from '@/lib/jobsScanner.types';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';

import React from 'react';

import { authOptions } from '../api/auth/[...nextauth]';
import useSWRInfinite from 'swr/infinite';
import { useAuthContext } from '@/context/AuthContext';

import JobsFeed from '@/components/JobsPage/JobsFeed';

import Spinner from '@/components/Spinner/Spinner';

import LoadButton from '@/components/Buttons/LoadButton';
import PageHead from '@/components/Layout/PageHead/PageHead';
import JobsSearch from '@/components/JobsPage/JobsSearch/JobsSearch';
import useFilterJobs from '@/hooks/useFilterJobs';
import useRedirect from '@/hooks/useRedirect';
import { getJobs } from '@/lib/api/jobs.util';

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

function Jobs(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { jobs } = props;

  //Redirect to home page if no jobs were found.
  useRedirect(() => checkIsJobsFoundWithToast(jobs));

  //Get filter Jobs query props.
  const filterJobsProps = useFilterJobs();
  const title = filterJobsProps.formValues.title;
  const reason = filterJobsProps.formValues.reason;
  // const { saveSessionValues } = useStateSession<FilterJobsField>({
  //   id: 'filterJobsProps',
  //   values: {
  //     title,
  //     reason
  //   },
  //   setState: filterJobsProps.setFormValues
  // });

  //Get user profile data.
  const { userProfileData } = useAuthContext();

  //Use swr infinite.
  const { data, isLoading, setSize, size, isValidating } = useSWRInfinite<ResponseGetJobs>(
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

  //Get last cur update data of SWR infinite
  const { allResponseData, lastResponse } = getLastCurJobData(data);

  const jobsData = allResponseData.map((response) => response.jobs).flat(1);
  return (
    <>
      <PageHead title="Jobs" description="Here is the place to find your next job." />
      <div className="flex justify-between px-8 pr-16 xs:flex-col  sm:flex-col">
        <h1 className="text-3xl">כ- {lastResponse.pagination?.numResultsFound || 0} משרות נמצאו:</h1>
        <JobsSearch filterJobsProps={filterJobsProps} jobsFilters={lastResponse.filters} />
      </div>

      <JobsFeed
        jobs={jobsData}
        userProfileData={userProfileData}
        // saveSessionValues={saveSessionValues}
      />

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
