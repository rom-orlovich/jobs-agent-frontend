/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericRecord } from '@/lib/types/types';
import { useRouter } from 'next/router';

import useStateSession from './useStateSession';
/**
 * This hook manage the state of the filters values and memorize them by using browser session.
 * @param initialValues The initial value of the filters values.
 * @param defaultValues The default value of the filters value.
 * @returns The current form values which are memorize by the browser session and on handleOnChangeFilterValue that handle the change of the filters value.
 */
function useFilters<T extends GenericRecord<any>>(initialValues: T, defaultValues = {}) {
  const [formValues, setFormValues] = useStateSession<T>({
    id: useRouter().pathname,
    values: initialValues
  });

  //Handle the set value of autocomplete.
  function handleOnChangeFilterValue<V extends string>(id: keyof T) {
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
    handleOnChangeFilterValue
  };
}
export type UseFilters<T extends GenericRecord<any>> = typeof useFilters<T>;
export type ReturnUseFiltersProps<T extends GenericRecord<any>> = ReturnType<UseFilters<T>>;

export default useFilters;
