import React from 'react';
import { JobsHeaderStyle } from '../JobsPage/JobsHeader';
import JobsTrackingSearch, { JobsTrackingSearchProps } from './JobTrackingSearch/JobsTrackingSearch';
interface JobsTrackingHeaderProps extends JobsTrackingSearchProps {
  numResultsFound?: number;
}
function JobsTrackingHeader({
  numResultsFound,
  filtersTrackingJobsProps,

  jobsTrackingFilters
}: JobsTrackingHeaderProps) {
  const textHeader = 'משרות';
  return (
    <div className={JobsHeaderStyle.jobsHeaderContainer}>
      <h1 className="xm:w-full mb-4 w-[105%] text-3xl xs:mb-0">
        כ- {numResultsFound || 0} {textHeader} נמצאו:
      </h1>
      <JobsTrackingSearch
        filtersTrackingJobsProps={filtersTrackingJobsProps}
        jobsTrackingFilters={jobsTrackingFilters}
      />
    </div>
  );
}

export default JobsTrackingHeader;
