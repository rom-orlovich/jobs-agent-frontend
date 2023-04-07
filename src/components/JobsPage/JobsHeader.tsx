import useFilterJobs from '@/hooks/useFiltersHooks/useFilterJobs';
import { FacetFilterResults, MutateJobs } from '@/lib/types/jobsScanner.types';
import React from 'react';
import JobsSearch from './JobsSearch/JobsSearch';
export const JobsHeaderStyle = {
  jobsHeaderContainer: 'flex justify-between xs:flex-col flex-col xs-px-2'
};
interface JobsHeaderProps {
  filterJobsProps: ReturnType<typeof useFilterJobs>;
  numResultsFound?: number;
  isMatchPage: boolean;
  filters: FacetFilterResults;
  mutate: MutateJobs;
}
function JobsHeader({
  filterJobsProps,
  numResultsFound,
  isMatchPage,
  filters,
  mutate
}: JobsHeaderProps) {
  const textHeader = isMatchPage ? 'התאמות' : 'משרות';
  return (
    <div className={JobsHeaderStyle.jobsHeaderContainer}>
      <h1 className="xm:w-full mb-4 w-[105%] text-3xl xs:mb-0">
        כ- {numResultsFound || 0} {textHeader} נמצאו:
      </h1>
      <JobsSearch
        mutate={mutate}
        filterJobsProps={filterJobsProps}
        jobsFilters={filters}
        includeReasonFilters={!isMatchPage}
      />
    </div>
  );
}

export default JobsHeader;
