import SearchInput, { IconButtonProps } from '@/components/SearchInput/SearchInput';
import { ReturnUseFilterJobsProps } from '@/hooks/useFiltersHooks/useFilterJobs';

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
  const titles: string[] = createAutocompleteOptions(jobsFilters?.titles);

  return (
    <SearchInput
      filtersJobsHookReturn={filterJobsProps}
      mainSearchInputProps={{
        options: titles,
        defaultValue: filterJobsProps.formValues.title,
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
