import { isJobsMatchesPage } from '@/lib/jobs.utils';
import { useRouter } from 'next/router';
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
function useFilterJobs(isMatchPage?: boolean) {
  const [formValues, setFormValues] = useStateSession<FilterJobsField>({
    id: useRouter().pathname,
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
        [id]: value,
        ...isJobsMatchesPage(!!isMatchPage)
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
