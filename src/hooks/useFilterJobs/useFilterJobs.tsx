import useForm from '../useForm/useForm';
interface FilterJobsField {
  title: string;
  reason: string;
}
/**
 *
 * @returns The handles function and formState of useFilterJobs.
 */
function useFilterJobs() {
  const { formState, formValues, setFormValues } = useForm<FilterJobsField>({
    title: '',
    reason: ''
  });
  //Handle the set value of autocomplete.
  function handleSearchValue<V extends string>(id: keyof FilterJobsField) {
    return (value: V) => {
      console.log(value);
      setFormValues((pre) => ({
        ...pre,
        [id]: value
      }));
    };
  }
  // //Handle the set value of autocomplete input.
  // function handleSearchByTitle<V extends string>(value: V) {
  //   setFormValues((pre) => ({
  //     ...pre,
  //     title: value
  //   }));
  // }
  return {
    handleSearchValue,
    formState,
    formValues
  };
}

export type ReturnUseFilterJobsProps = ReturnType<typeof useFilterJobs>;
export default useFilterJobs;
