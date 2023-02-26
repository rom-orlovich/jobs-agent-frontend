// import { useRouter } from 'next/router';
import useForm from '../useForm/useForm';
interface FilterJobsField {
  title: string;
  reason: string;
  // page: number;
}
/**
 *
 * @returns The handles function and formState of useFilterJobs.
 */
function useFilterJobs() {
  // const router = useRouter();
  const { formState, formValues, setFormValues } = useForm<FilterJobsField>({
    title: '',
    reason: ''
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
  // function setPage(page: number) {
  //   setFormValues((pre) => ({
  //     ...pre
  //     // page: page
  //   }));
  // }

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
    // setPage
  };
}

export type ReturnUseFilterJobsProps = ReturnType<typeof useFilterJobs>;
export default useFilterJobs;
