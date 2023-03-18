// import { Option } from '@/components/Inputs/SelectInput/selectInput.types';

import SearchInput, { IconButtonProps } from '@/components/SearchInput/SearchInput';
import { ReturnUseJobsTrackingFilterProps } from '@/hooks/useFiltersHooks/useFiltersTrackingJobs';

import React from 'react';
import JobsTrackingSearchFilters from './JobsTrackingSearchFilters';

export interface JobsTrackingFiltersArr {
  titles: string[];
  currentStageNames: string[];
}
export interface JobsTrackingSearchProps {
  jobsTrackingFilters: JobsTrackingFiltersArr;
  filtersTrackingJobsProps: ReturnUseJobsTrackingFilterProps;
}
function JobsTrackingSearch({ filtersTrackingJobsProps, jobsTrackingFilters }: JobsTrackingSearchProps) {
  return (
    <SearchInput
      filtersJobsHookReturn={filtersTrackingJobsProps}
      mainSearchInputProps={{
        options: jobsTrackingFilters.titles,
        defaultValue: filtersTrackingJobsProps.formValues.title,
        key: 'title'
      }}
    >
      <JobsTrackingSearchFilters
        iconButtonProps={IconButtonProps}
        filtersTrackingJobsProps={filtersTrackingJobsProps}
        jobsTrackingFilters={jobsTrackingFilters}
      />
    </SearchInput>
  );
}

export default JobsTrackingSearch;
