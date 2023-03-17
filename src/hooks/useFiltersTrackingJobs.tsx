import useFilters, { ReturnUseFiltersProps } from './useFilters';

export interface FilterTrackingJobsField {
  title: string;
  CVwasSent?: boolean;
  afterUpdateDate: string;
  currentStage: string;
}

/**
 * @returns The handles function and formState of useFilterJobs.
 */
function useFilterTrackingJobs() {
  const useFiltersReturnValues = useFilters<FilterTrackingJobsField>({
    title: '',
    CVwasSent: undefined,
    afterUpdateDate: '',
    currentStage: ''
  });
  return useFiltersReturnValues;
}

export type ReturnUseFilterTrackingJobsProps = ReturnUseFiltersProps<FilterTrackingJobsField>;
export default useFilterTrackingJobs;
