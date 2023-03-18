import useFilters, { ReturnUseFiltersProps } from './useFilters';

export interface HistoryQueriesFiltersFields {
  location: string;
  position: string;
  afterUpdateDate: string;
}

/**
 * @returns The handles function and formState of useFilterJobs.
 */
function useHistoryQueriesFilters() {
  const useFiltersReturnValues = useFilters<HistoryQueriesFiltersFields>({
    location: '',
    position: '',
    afterUpdateDate: ''
  });
  return useFiltersReturnValues;
}

export type ReturnUseHistoryQueriesFilters = ReturnUseFiltersProps<HistoryQueriesFiltersFields>;
export default useHistoryQueriesFilters;
