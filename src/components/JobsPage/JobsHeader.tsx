import useFilterJobs from '@/hooks/useFiltersHooks/useFilterJobs';
import { FacetFilterResults } from '@/lib/types/jobsScanner.types';
import React from 'react';
import JobsSearch from './JobsSearch/JobsSearch';

export const JobsHeaderStyle = {
  jobsHeaderContainer: 'flex justify-between xs:flex-col flex-col px-2'
};
interface JobsHeaderProps {
  filterJobsProps: ReturnType<typeof useFilterJobs>;
  numResultsFound?: number;
  isMatchPage: boolean;
  filters: FacetFilterResults;
}
function JobsHeader({ filterJobsProps, numResultsFound, isMatchPage, filters }: JobsHeaderProps) {
  const textHeader = isMatchPage ? 'התאמות' : 'משרות';
  return (
    <div className={JobsHeaderStyle.jobsHeaderContainer}>
      <h1 className="xm:w-full mb-4 w-[105%] text-3xl xs:mb-0">
        כ- {numResultsFound || 0} {textHeader} נמצאו:
      </h1>
      <JobsSearch
        filterJobsProps={filterJobsProps}
        jobsFilters={filters}
        includeReasonFilters={!isMatchPage}
      />
    </div>
  );
}

export default JobsHeader;
