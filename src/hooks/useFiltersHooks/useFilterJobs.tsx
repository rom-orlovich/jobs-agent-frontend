import { isJobsMatchesPage } from '@/components/JobsPage/utils';

import useFilters, { ReturnUseFiltersProps } from './useFilters';

export interface FilterJobsField {
  title: string;
  jobObserved?: boolean;
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
  const initializeValue = {
    title: '',
    reason: '',
    company: '',
    from: '',
    location: '',
    jobObserved: undefined,
    ...isJobsMatchesFilter
  };

  const useFiltersReturnValues = useFilters<FilterJobsField>(initializeValue, defaultValues);

  return useFiltersReturnValues;
}

export type ReturnUseFilterJobsProps = ReturnUseFiltersProps<FilterJobsField>;
export default useFilterJobs;
