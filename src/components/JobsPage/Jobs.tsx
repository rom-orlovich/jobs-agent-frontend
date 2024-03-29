import { useAuthContext } from '@/context/AuthContext';
import { ResponseGetJobs } from '@/lib/types/jobsScanner.types';
import { useSWRInfiniteHook } from '@/lib/swr';

import React from 'react';
import Spinner from '../Spinner/Spinner';

import JobsHeader from './JobsHeader';
import LoadButtonContainer from './LoadButtonContainer';
import JobsFeed from './JobFeed/JobsFeed';
import { getLastCurJobData, swrInfiniteHandler } from './utils';
import useRedirect from '@/hooks/useRedirect';
import { createToastsByDataIfExist } from '@/lib/utils';
import useFilterJobs from '@/hooks/useFiltersHooks/useFilterJobs';
const JobsStyle = {
  feedContainer: 'pr-8 xs:pr-16',
  spinner: '!top-[none] bottom-5'
};

function Jobs({
  initialsProps,
  isMatchPage
}: {
  initialsProps: ResponseGetJobs;
  isMatchPage?: boolean;
}) {
  //Check the status of the data and display proper message.
  //If The data it not exist, redirect to the home page.
  useRedirect(createToastsByDataIfExist('SCANNER_SUCCESS', 'JOBS_ARE_NOT_FOUND', initialsProps?.jobs));

  //Get filter Jobs query props.
  const filterJobsProps = useFilterJobs(isMatchPage);
  const { formValues } = filterJobsProps;

  //Get user profile data.
  const { userProfileData } = useAuthContext();
  //Use swr infinite.
  const useSwrInfiniteProps = useSWRInfiniteHook<ResponseGetJobs>(
    swrInfiniteHandler(userProfileData, {
      ...formValues
    }),
    {
      revalidateIfStale: true,

      revalidateFirstPage: false,
      fallbackData: [initialsProps]
    }
  );

  const { isLoading, isValidating, data, setSize, mutate } = useSwrInfiniteProps;

  //Get last cur update data of SWR infinite
  const { allResponseData, lastResponse } = getLastCurJobData(data);
  const jobsData = allResponseData
    .map((response) => response.jobs)
    .filter((el) => el)
    .flat(1);

  return (
    <div className={JobsStyle.feedContainer}>
      <JobsHeader
        mutate={mutate}
        filterJobsProps={filterJobsProps}
        filters={lastResponse.filters}
        isMatchPage={!!isMatchPage}
        numResultsFound={lastResponse?.pagination?.numResultsAfterFilter}
      />

      <JobsFeed jobs={jobsData} userProfileData={userProfileData} />

      {jobsData.length ? (
        <LoadButtonContainer setSize={setSize} hasMore={lastResponse?.pagination?.hasMore} />
      ) : (
        <></>
      )}

      <Spinner className={JobsStyle.spinner} isLoading={isValidating || isLoading || !data} />
    </div>
  );
}

export default Jobs;
