import { Option } from '@/components/Inputs/SelectInput/selectInput.types';
import SearchInput, { IconButtonProps } from '@/components/SearchInput/SearchInput';

import { ReturnUseFilterJobsProps } from '@/hooks/useFilterJobs';

import { FacetFilterResults } from '@/lib/types/jobsScanner.types';
import React from 'react';

import JobsSearchFilters from './JobsSearchFilters';

import { createAutocompleteOptions } from './utils';

function JobsSearch({
  filterJobsProps,
  jobsFilters,
  includeReasonFilters
}: {
  jobsFilters: FacetFilterResults;
  filterJobsProps: ReturnUseFilterJobsProps;
  includeReasonFilters: boolean;
  isMatchPage?: boolean;
}) {
  const titles: Option<string>[] = createAutocompleteOptions(jobsFilters?.titles);

  return (
    <SearchInput
      filtersJobsHookReturn={filterJobsProps}
      mainSearchInputProps={{
        options: titles,
        defaultValue: {
          id: 'default1',
          value: filterJobsProps.formValues.title,
          title: filterJobsProps.formValues.title
        },
        key: 'title'
      }}
    >
      <JobsSearchFilters
        includeReasonFilters={includeReasonFilters}
        jobsFilters={jobsFilters}
        iconButtonProps={IconButtonProps}
        filterJobsProps={filterJobsProps}
      />
    </SearchInput>
  );
}

export default JobsSearch;
