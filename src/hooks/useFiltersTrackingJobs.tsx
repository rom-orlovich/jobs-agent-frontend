import useFilters, { ReturnUseFiltersProps } from './useFilters';

export interface JobsTrackingFilterFields {
  title: string;
  CVwasSent: boolean;
  afterUpdateDate: string;
  currentStageName: string;
}

/**
 * @returns The handles function and formState of useFilterJobs.
 */
function useFilterTrackingJobs() {
  const useFiltersReturnValues = useFilters<JobsTrackingFilterFields>({
    title: '',
    CVwasSent: false,
    afterUpdateDate: '',
    currentStageName: ''
  });
  return useFiltersReturnValues;
}

export type ReturnUseFilterTrackingJobsProps = ReturnUseFiltersProps<JobsTrackingFilterFields>;
export default useFilterTrackingJobs;
