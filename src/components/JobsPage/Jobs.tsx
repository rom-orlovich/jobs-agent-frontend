import { useAuthContext } from '@/context/AuthContext';
import useFilterJobs from '@/hooks/useFilterJobs';
import { getLastCurJobData, swrInfiniteHandler } from '@/lib/jobs.utils';
import { ResponseGetJobs } from '@/lib/types/jobsScanner.types';
import { useSWRInfiniteHook } from '@/lib/swr';

import React from 'react';

// import LoadButton from '../Buttons/LoadButton';
import Spinner from '../Spinner/Spinner';
import JobsFeed from './Jobs/JobsFeed';
// import JobsSearch from './JobsSearch/JobsSearch';
import LoadButtonContainer from './Jobs/LoadButtonContainer';
import JobsHeader from './Jobs/JobsHeader';

const JobsStyle = {
  feedContainer: 'pr-10 xs:pr-16',
  jobsHeaderContainer: 'flex justify-between xs:flex-col flex-col',
  loadButtonContainer: 'flex w-full items-center justify-center',
  loadButton: 'items-center px-7 py-2 text-2xl',
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

  // const handleLoadButtonClick: MouseEventHandler<HTMLButtonElement> = () => setSize(size + 2);

  // const textHeader = isMatchPage ? 'התאמות' : 'משרות';

  return (
    <div className={JobsStyle.feedContainer}>
      {/* <div className={JobsStyle.jobsHeaderContainer}>
        <h1 className="text-3xl">
          כ- {lastResponse.pagination?.numResultsFound || 0} {textHeader} נמצאו:
        </h1>
        <JobsSearch
          filterJobsProps={filterJobsProps}
          jobsFilters={lastResponse.filters}
          includeReasonFilter={!isMatchPage}
        />
      </div> */}
      <JobsHeader
        filterJobsProps={filterJobsProps}
        filters={lastResponse.filters}
        isMatchPage
        numResultsFound={lastResponse.pagination?.numResultsFound}
      />

      <JobsFeed jobs={jobsData} userProfileData={userProfileData} />

      {jobsData.length && (
        <LoadButtonContainer setSize={setSize} hasMore={lastResponse.pagination.hasMore} />
        // <div className={JobsStyle.loadButtonContainer}>
        //   <LoadButton
        //     disabled={!lastResponse?.pagination?.hasMore}
        //     className={JobsStyle.loadButton}
        //     onClick={handleLoadButtonClick}
        //   >
        //     טען משרות
        //   </LoadButton>
        // </div>
      )}

      <Spinner className={JobsStyle.spinner} isLoading={isValidating || isLoading || !data} />
    </div>
  );
}

export default Jobs;
