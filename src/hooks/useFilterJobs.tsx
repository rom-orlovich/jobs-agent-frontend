import { isJobsMatchesPage } from '@/components/JobsPage/utils';

import useFilters, { ReturnUseFilterProps } from './useFilters';

export interface FilterJobsField {
  title: string;
  reason: string;
  from: string;
  company: string;
  location: string;
}

/**
 * @returns The handles function and formState of useFilterJobs.
 */
function useFilterJobs(isMatchPage?: boolean) {
  const isJobsMatchesFilter = isJobsMatchesPage(!!isMatchPage);
  const defaultValues = {
    page: 1,
    ...isJobsMatchesFilter
  };
  const { formValues, handleSearchValue } = useFilters<FilterJobsField>(
    {
      title: '',
      reason: '',
      company: '',
      from: '',
      location: '',

      ...isJobsMatchesFilter
    },
    defaultValues
  );
  return {
    formValues,
    handleSearchValue
  };
}

export type ReturnUseFilterJobsProps = ReturnUseFilterProps<FilterJobsField>;
export default useFilterJobs;
