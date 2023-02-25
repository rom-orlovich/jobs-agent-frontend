import useForm from '../useForm/useForm';

function useFilterJobs() {
  const { formState, formValues, onChange } = useForm({
    searchValue: ''
  });

  const handleSearchInput = onChange;
  return {
    handleSearchInput,
    formState,
    formValues
  };
}

export type ReturnUseFilterJobsProps = ReturnType<typeof useFilterJobs>;
export default useFilterJobs;
