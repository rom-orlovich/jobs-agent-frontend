import React from 'react';
import { FacetFilterResults } from '@/lib/types/jobsScanner.types';
import { createAutocompletePropsArr } from './utils';
import FiltersPopup from '@/components/SearchInput/FiltersPopup';
import { ReturnUseFilterJobsProps } from '@/hooks/useFiltersHooks/useFilterJobs';
import SelectStatusObserved from './StatusObserved';
import AutocompleteFilter from '@/components/SearchInput/AutocompleteFilter';

export const JobsSearchFiltersStyle = {
  autocompleteList: 'flex flex-col gap-2'
};

interface JobsSearchFiltersProps {
  filterJobsProps: ReturnUseFilterJobsProps;
  jobsFilters: FacetFilterResults;
  includeReasonFilters: boolean;
}

function JobsSearchFilters({
  filterJobsProps,
  jobsFilters,
  includeReasonFilters
}: JobsSearchFiltersProps) {
  const { handleSetFilterValue } = filterJobsProps;
  const autocompletePropsArr = createAutocompletePropsArr(jobsFilters);

  return (
    <FiltersPopup>
      <ul className={JobsSearchFiltersStyle.autocompleteList}>
        <li>
          <SelectStatusObserved {...filterJobsProps} />
        </li>
        {autocompletePropsArr.map(({ key, label, options }, i) => {
          //If it is match page, the reason filter will be empty.
          if (i === 0 && !includeReasonFilters) return <li key={key + i}></li>;

          const value = filterJobsProps.formValues[key];
          return (
            <li key={i + key + Date.now()}>
              <AutocompleteFilter
                defaultValue={value}
                label={label}
                setValue={handleSetFilterValue(key)}
                options={options}
              />
            </li>
          );
        })}
      </ul>
    </FiltersPopup>
  );
}

export default JobsSearchFilters;
