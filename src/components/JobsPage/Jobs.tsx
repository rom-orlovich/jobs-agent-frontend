import { useAuthContext } from '@/context/AuthContext';
import useFilterJobs from '@/hooks/useFilterJobs';
import { getLastCurJobData, swrInfiniteHandler } from '@/lib/jobs.utils';
import { ResponseGetJobs } from '@/lib/jobsScanner.types';
import { useSWRInfiniteHook } from '@/lib/swr';

import React, { MouseEventHandler } from 'react';

import LoadButton from '../Buttons/LoadButton';
import Spinner from '../Spinner/Spinner';
import JobsFeed from './JobsFeed';
import JobsSearch from './JobsSearch/JobsSearch';

const JobsStyle = {
  jobsContainer: 'flex justify-between px-8 pr-16 xs:flex-col  sm:flex-col',
  loadButtonContainer: 'flex w-full items-center justify-center',
  loadButton: 'items-center px-7 py-2 text-2xl',
  spinner: '!top-[none] bottom-5'
};

function Jobs({ initialsProps }: { initialsProps: ResponseGetJobs }) {
  //Get filter Jobs query props.
  const filterJobsProps = useFilterJobs();
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
      revalidateOnFocus: false,
      refreshWhenOffline: false,
      revalidateOnMount: false,
      revalidateAll: false,
      fallbackData: [initialsProps]
    }
  );
  const { size, isLoading, isValidating, data, setSize } = useSwrInfiniteProps;
  //Get last cur update data of SWR infinite
  const { allResponseData, lastResponse } = getLastCurJobData(data);
  const jobsData = allResponseData.map((response) => response.jobs).flat(1);

  const handleLoadButtonClick: MouseEventHandler<HTMLButtonElement> = () => setSize(size + 2);

  return (
    <>
      <div className={JobsStyle.jobsContainer}>
        <h1 className="text-3xl">כ- {lastResponse.pagination?.numResultsFound || 0} משרות נמצאו:</h1>
        <JobsSearch filterJobsProps={filterJobsProps} jobsFilters={lastResponse.filters} />
      </div>

      <JobsFeed jobs={jobsData} userProfileData={userProfileData} />

      {jobsData.length && (
        <div className={JobsStyle.loadButtonContainer}>
          <LoadButton
            disabled={!lastResponse.pagination.hasMore}
            className={JobsStyle.loadButton}
            onClick={handleLoadButtonClick}
          >
            טען משרות
          </LoadButton>
        </div>
      )}

      <Spinner className={JobsStyle.spinner} isLoading={isValidating || isLoading || !data} />
    </>
  );
}

export default Jobs;
