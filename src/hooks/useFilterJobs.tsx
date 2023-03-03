import useStateSession from './useStateSession';
export interface FilterJobsField {
  title: string;
  reason: string;
  page?: number;
}
/**
 *
 * @returns The handles function and formState of useFilterJobs.
 */
function useFilterJobs() {
  const [formValues, setFormValues] = useStateSession<FilterJobsField>({
    id: 'formsValues',
    values: {
      title: '',
      reason: ''
    }
  });
  //Handle the set value of autocomplete.
  function handleSearchValue<V extends string>(id: keyof FilterJobsField) {
    return (value: V) => {
      setFormValues((pre) => ({
        ...pre,
        page: 1,
        [id]: value
      }));
    };
  }

  return {
    // formState,
    formValues,
    // setFormValues,
    handleSearchValue
  };
}

export type ReturnUseFilterJobsProps = ReturnType<typeof useFilterJobs>;
export default useFilterJobs;
