import useFilters, { ReturnUseFiltersProps } from './useFilters';

export interface JobsTrackingFiltersFields {
  title: string;
  CVwasSent: boolean;
  afterUpdateDate: string;
  currentStageName: string;
}

/**
 * @returns The handles function and formState of useFilterJobs.
 */
function useJobsTrackingFilter() {
  const useFiltersReturnValues = useFilters<JobsTrackingFiltersFields>({
    title: '',
    CVwasSent: false,
    afterUpdateDate: '',
    currentStageName: ''
  });
  return useFiltersReturnValues;
}

export type ReturnUseJobsTrackingFilterProps = ReturnUseFiltersProps<JobsTrackingFiltersFields>;
export default useJobsTrackingFilter;
