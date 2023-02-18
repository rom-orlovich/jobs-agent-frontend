import { GenericRecord } from '@/lib/type';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useForm<T extends GenericRecord<any>, K = any>(initialState: T) {
  const [formValues, setFormValues] = useState(initialState);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormValues((pre) => {
      return {
        ...pre,
        [e.target.id]: e.target.value
      };
    });
  };

  const onSubmit: (cb: (formValue: T) => Promise<K>) => FormEventHandler<HTMLFormElement> =
    (cb) => async (e) => {
      e.preventDefault();
      const res = await cb(formValues);
      console.log(res);
      return res;
    };

  return {
    formValues,
    setFormValues,
    onChange,
    onSubmit
  };
}

export default useForm;
