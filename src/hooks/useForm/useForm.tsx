import { AnyFun, GenericRecord } from '@/lib/type';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';

function useForm<T extends GenericRecord<unknown>>(initialState: T) {
  const [formValues, setFormValues] = useState(initialState);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormValues((pre) => {
      return {
        ...pre,
        [e.target.id]: e.target.value
      };
    });
  };

  const onSubmit: (cb: AnyFun) => FormEventHandler<HTMLFormElement> = (cb) => (e) => {
    e.preventDefault();
    cb(formValues);
  };

  return {
    formValues,
    setFormValues,
    onChange,
    onSubmit
  };
}

export default useForm;
