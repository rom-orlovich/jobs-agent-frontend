import { Option } from '@/components/Inputs/SelectInput/selectInput.types';
import { createAutocompleteOptions } from '@/components/JobsPage/JobsSearch/utils';
import SearchInput, { IconButtonProps } from '@/components/SearchInput/SearchInput';
import { ReturnUseFilterTrackingJobsProps } from '@/hooks/useFiltersTrackingJobs';
import React from 'react';
import JobsTrackingSearchFilters from './JobsTrackingSearchFilters';

export interface JobsTrackingFilters {
  titles: string[];
  currentStage: string[];
}
export interface JobsTrackingSearchProps {
  jobsTrackingFilters: JobsTrackingFilters;
  filtersTrackingJobsProps: ReturnUseFilterTrackingJobsProps;
}
function JobsTrackingSearch({ filtersTrackingJobsProps, jobsTrackingFilters }: JobsTrackingSearchProps) {
  const titles: Option<string>[] = createAutocompleteOptions(jobsTrackingFilters?.titles);

  return (
    <SearchInput
      filtersJobsHookReturn={filtersTrackingJobsProps}
      mainSearchInputProps={{
        options: titles,
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
