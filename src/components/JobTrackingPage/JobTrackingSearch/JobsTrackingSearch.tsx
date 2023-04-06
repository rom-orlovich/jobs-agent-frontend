// import { Option } from '@/components/Inputs/SelectInput/selectInput.types';

import SearchInput from '@/components/SearchInput/SearchInput';
import { ReturnUseJobsTrackingFilterProps } from '@/hooks/useFiltersHooks/useFiltersTrackingJobs';

import React from 'react';
import JobsTrackingSearchFilters from './JobsTrackingSearchFilters';
import { JobsTrackingFiltersValues } from '../utils';
export interface JobsTrackingSearchProps {
  jobsTrackingFilters: JobsTrackingFiltersValues;
  filtersTrackingJobsProps: ReturnUseJobsTrackingFilterProps;
}

function JobsTrackingSearch({ filtersTrackingJobsProps, jobsTrackingFilters }: JobsTrackingSearchProps) {
  return (
    <SearchInput
      filtersJobsHookReturn={filtersTrackingJobsProps}
      mainSearchInputProps={{
        options: jobsTrackingFilters.titles,
        key: 'title'
      }}
    >
      <JobsTrackingSearchFilters
        filtersTrackingJobsProps={filtersTrackingJobsProps}
        jobsTrackingFilters={jobsTrackingFilters}
      />
    </SearchInput>
  );
}

export default JobsTrackingSearch;
