import { GenericRecord } from '@/lib/types';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';

interface FormState<D> {
  isLoading: boolean;
  data?: D;
  isSent: boolean;
  error?: Error;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useForm<T extends GenericRecord<any>, D = any>(initialState: T) {
  const [formValues, setFormValues] = useState(initialState);
  const [formState, setFromState] = useState<FormState<D>>({
    isLoading: false,
    data: undefined,
    isSent: false
  });
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormValues((pre) => {
      return {
        ...pre,
        [e.target.id]: e.target.value
      };
    });
  };

  const onSubmit: (cb: (formValue: T) => Promise<D>) => FormEventHandler<HTMLFormElement> =
    (cb) => async (e) => {
      e.preventDefault();
      try {
        setFromState((pre) => ({
          ...pre,
          data: undefined,
          isLoading: true,
          isSent: true
        }));
        const res = await cb(formValues);

        setFromState({
          data: res,
          isLoading: false,
          isSent: false
        });
        return res;
      } catch (error) {
        setFromState({
          data: undefined,
          isLoading: false,
          isSent: false,
          error: new Error('Something went wrong')
        });
      }
      return formState.error;
    };

  return {
    formValues,
    setFormValues,
    onChange,
    onSubmit,
    formState
  };
}

export default useForm;
