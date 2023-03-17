/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericRecord } from '@/lib/types/types';
import { useRouter } from 'next/router';

import useStateSession from './useStateSession';
function useFilters<T extends GenericRecord<any>>(initialValues: T, defaultValues = {}) {
  const [formValues, setFormValues] = useStateSession<T>({
    id: useRouter().pathname,
    values: initialValues
  });

  //Handle the set value of autocomplete.
  function handleSearchValue<V extends string>(id: keyof T) {
    return (value: V) => {
      setFormValues((pre) => ({
        ...pre,
        [id]: value,
        ...defaultValues
      }));
    };
  }

  return {
    formValues,
    handleSearchValue
  };
}

export type ReturnUseFilterProps<T extends GenericRecord<any>> = ReturnType<typeof useFilters<T>>;

export default useFilters;
