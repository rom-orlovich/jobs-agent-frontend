import { useAuthContext } from '@/context/AuthContext';
import useFilterJobs from '@/hooks/useFilterJobs';
import { getLastCurJobData, swrInfiniteHandler } from '@/lib/jobs.utils';
import { ResponseGetJobs } from '@/lib/types/jobsScanner.types';
import { useSWRInfiniteHook } from '@/lib/swr';

import React from 'react';
import Spinner from '../Spinner/Spinner';

import JobsHeader from './JobsHeader';
import LoadButtonContainer from './LoadButtonContainer';
import JobsFeed from './JobFeed/JobsFeed';

const JobsStyle = {
  feedContainer: 'pr-10 xs:pr-16',

  spinner: '!top-[none] bottom-5'
};

function Jobs({
  initialsProps,
  isMatchPage
}: {
  initialsProps: ResponseGetJobs;
  isMatchPage?: boolean;
}) {
  //Get filter Jobs query props.
  const filterJobsProps = useFilterJobs(isMatchPage);
  const title = filterJobsProps.formValues.title;
  const reason = filterJobsProps.formValues.reason;

  //Get user profile data.
  const { userProfileData } = useAuthContext();

  //Use swr infinite.
  const useSwrInfiniteProps = useSWRInfiniteHook<ResponseGetJobs>(
    swrInfiniteHandler(userProfileData, {
      title: title,
      reason: reason
    }),
    {
      revalidateIfStale: true,
      revalidateFirstPage: false,
      fallbackData: [initialsProps]
    }
  );
  const { isLoading, isValidating, data, setSize } = useSwrInfiniteProps;
  //Get last cur update data of SWR infinite
  const { allResponseData, lastResponse } = getLastCurJobData(data);
  const jobsData = allResponseData.map((response) => response.jobs).flat(1);

  return (
    <div className={JobsStyle.feedContainer}>
      <JobsHeader
        filterJobsProps={filterJobsProps}
        filters={lastResponse.filters}
        isMatchPage
        numResultsFound={lastResponse.pagination?.numResultsFound}
      />

      <JobsFeed jobs={jobsData} userProfileData={userProfileData} />

      {jobsData.length ? (
        <LoadButtonContainer setSize={setSize} hasMore={lastResponse.pagination.hasMore} />
      ) : (
        <></>
      )}

      <Spinner className={JobsStyle.spinner} isLoading={isValidating || isLoading || !data} />
    </div>
  );
}

export default Jobs;
