import { Option } from '@/components/Inputs/SelectInput/selectInput.types';

import SearchInput, { IconButtonProps } from '@/components/SearchInput/SearchInput';
import { ReturnUseFilterTrackingJobsProps } from '@/hooks/useFiltersTrackingJobs';
import React from 'react';
import JobsTrackingSearchFilters from './JobsTrackingSearchFilters';

export interface JobsTrackingFiltersArr {
  titles: Option<string>[];
  currentStageNames: Option<string>[];
}
export interface JobsTrackingSearchProps {
  jobsTrackingFilters: JobsTrackingFiltersArr;
  filtersTrackingJobsProps: ReturnUseFilterTrackingJobsProps;
}
function JobsTrackingSearch({ filtersTrackingJobsProps, jobsTrackingFilters }: JobsTrackingSearchProps) {
  // const titles: Option<string>[] = createAutocompleteOptions(jobsTrackingFilters?.titles);

  return (
    <SearchInput
      filtersJobsHookReturn={filtersTrackingJobsProps}
      mainSearchInputProps={{
        options: jobsTrackingFilters.titles,
        defaultValue: {
          id: 'default1',
          value: filtersTrackingJobsProps.formValues.title,
          title: filtersTrackingJobsProps.formValues.title
        },
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
