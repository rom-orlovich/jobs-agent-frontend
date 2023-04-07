import SearchInput from '@/components/SearchInput/SearchInput';
import { ReturnUseFilterJobsProps } from '@/hooks/useFiltersHooks/useFilterJobs';

import { FacetFilterResults, MutateJobs } from '@/lib/types/jobsScanner.types';
import React from 'react';

import JobsSearchFilters from './JobsSearchFilters';

import { createAutocompleteOptions } from './utils';
interface JobSearchProps {
  jobsFilters: FacetFilterResults;
  filterJobsProps: ReturnUseFilterJobsProps;
  includeReasonFilters: boolean;
  isMatchPage?: boolean;
  mutate: MutateJobs;
}

function JobsSearch({ filterJobsProps, jobsFilters, includeReasonFilters, mutate }: JobSearchProps) {
  const titles: string[] = createAutocompleteOptions(jobsFilters?.titles);
  return (
    <SearchInput
      filtersJobsHookReturn={filterJobsProps}
      mainSearchInputProps={{
        options: titles,
        key: 'title'
      }}
    >
      <JobsSearchFilters
        mutate={mutate}
        includeReasonFilters={includeReasonFilters}
        jobsFilters={jobsFilters}
        filterJobsProps={filterJobsProps}
      />
    </SearchInput>
  );
}

export default JobsSearch;
