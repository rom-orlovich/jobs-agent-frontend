import { FilterJobsField } from '@/hooks/useFiltersHooks/useFilterJobs';

import { FacetFilterResults } from '@/lib/types/jobsScanner.types';
import { OmitKey } from '@/lib/types/types';
export const createAutocompleteOptions = (filters?: string[]) => {
  const filtersOptions: string[] = [];
  (filters || []).forEach((filter) => {
    if (filter) filtersOptions.push(filter);
  });
  return filtersOptions;
};

//Create autocomplete props array.
export const createAutocompletePropsArr = (jobsFilters: FacetFilterResults) => {
  const reasonsOptions: string[] = createAutocompleteOptions(jobsFilters?.reasons);

  const fromOptions: string[] = createAutocompleteOptions(jobsFilters?.from);
  const companiesOptions: string[] = createAutocompleteOptions(jobsFilters?.companies);
  const locationOptions: string[] = createAutocompleteOptions(jobsFilters?.locations);

  const autocompletePropsArr: {
    label: string;
    key: keyof OmitKey<FilterJobsField, 'jobObserved'>;
    options: string[];
  }[] = [
    {
      label: 'חפש עפ התאמה',
      key: 'reason',
      options: reasonsOptions
    },
    {
      label: 'חפש עפ אתר',
      key: 'from',
      options: fromOptions
    },
    {
      label: 'חפש עפ חברה',
      key: 'company',
      options: companiesOptions
    },
    {
      label: 'חפש עפ מיקום',
      key: 'location',
      options: locationOptions
    }
  ];
  return autocompletePropsArr;
};
