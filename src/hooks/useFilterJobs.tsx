import { isJobsMatchesPage } from '@/components/JobsPage/utils';
import { useRouter } from 'next/router';
import useStateSession from './useStateSession';
export interface FilterJobsField {
  title: string;
  reason: string;
  from: string;
  company: string;
  location: string;
}

/**
 * @returns The handles function and formState of useFilterJobs.
 */
function useFilterJobs(isMatchPage?: boolean) {
  const [formValues, setFormValues] = useStateSession<FilterJobsField>({
    id: useRouter().pathname,
    values: {
      title: '',
      reason: '',
      company: '',
      from: '',
      location: '',

      ...isJobsMatchesPage(!!isMatchPage)
    }
  });

  //Handle the set value of autocomplete.
  function handleSearchValue<V extends string>(id: keyof FilterJobsField) {
    return (value: V) => {
      setFormValues((pre) => ({
        ...pre,
        [id]: value,
        page: 1,
        ...isJobsMatchesPage(!!isMatchPage)
      }));
    };
  }

  return {
    formValues,
    handleSearchValue
  };
}

export type ReturnUseFilterJobsProps = ReturnType<typeof useFilterJobs>;
export default useFilterJobs;
