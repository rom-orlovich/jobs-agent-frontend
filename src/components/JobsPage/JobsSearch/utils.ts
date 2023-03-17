import { Option } from '@/components/Inputs/SelectInput/selectInput.types';
import { FilterJobsField } from '@/hooks/useFilterJobs';
import { FacetFilterResults } from '@/lib/types/jobsScanner.types';
export const createAutocompleteOptions = (filters?: string[]) => {
  return (filters || []).map((filter, i) => ({
    id: filter + i,
    title: filter,
    value: filter
  }));
};

//Create autocomplete props array.
export const createAutocompletePropsArr = (jobsFilters: FacetFilterResults) => {
  const reasonsOptions: Option<string>[] = createAutocompleteOptions(jobsFilters?.reasons);
  const fromOptions: Option<string>[] = createAutocompleteOptions(jobsFilters?.from);
  const companiesOptions: Option<string>[] = createAutocompleteOptions(jobsFilters?.companies);
  const locationOptions: Option<string>[] = createAutocompleteOptions(jobsFilters?.locations);

  const autocompletePropsArr: {
    label: string;
    key: keyof FilterJobsField;
    options: Option<string>[];
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
