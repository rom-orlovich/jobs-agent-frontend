import useForm from '../useForm/useForm';
interface FilterJobsField {
  title: string;
}
/**
 *
 * @returns The handles function and formState of useFilterJobs.
 */
function useFilterJobs() {
  const { formState, formValues, onChange, setFormValues } = useForm<FilterJobsField>({
    title: ''
  });
  const handleSearchInput = onChange;

  //Handle the set value of autocomplete input.
  function handleSearchByTitle<V extends string>(value: V) {
    setFormValues((pre) => ({
      ...pre,
      title: value
    }));
  }
  return {
    handleSearchInput,
    handleSearchByTitle,
    formState,
    formValues
  };
}

export type ReturnUseFilterJobsProps = ReturnType<typeof useFilterJobs>;
export default useFilterJobs;
