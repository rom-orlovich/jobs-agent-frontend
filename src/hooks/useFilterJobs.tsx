import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useForm from './useForm';
export interface FilterJobsField {
  title: string;
  reason: string;
}
/**
 *
 * @returns The handles function and formState of useFilterJobs.
 */
function useFilterJobs() {
  const router = useRouter();
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
  useEffect(() => {
    console.log(formValues.reason);
    if (formValues.reason || formValues.title) {
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            ...formValues
          }
        },
        undefined,
        {
          shallow: true
        }
      );
    }
  }, [formValues, router]);

  return {
    formState,
    formValues,
    setFormValues,
    handleSearchValue
  };
}

export type ReturnUseFilterJobsProps = ReturnType<typeof useFilterJobs>;
export default useFilterJobs;
