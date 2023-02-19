import useForm from '@/hooks/useForm/useForm';
import useUser from '@/hooks/useUser';
import { UserOptions } from '@/lib/user';

import { useEffect } from 'react';

import { MinMaxSelectOption } from '../Profile/MinMaxSelect';
import { handleExcludedRequirements, handleRequirements } from './handlers';

function useUserForm() {
  // Const { data: userSession } = useSession();
  const { user } = useUser();
  console.log(user);
  const formInitialValue: UserOptions = {
    overallEx: 0,
    requirements: {},
    excludedRequirements: {},
    userQuery: {}
  };
  const { formValues, onChange, onSubmit, setFormValues, formState } = useForm<
    UserOptions,
    { message: string }
  >(formInitialValue);

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  const setRequirements = (minMaxValues: MinMaxSelectOption[]) => {
    const requirements = handleRequirements(minMaxValues);
    setFormValues((pre) => {
      return {
        ...pre,
        requirements: requirements
      };
    });
  };
  const setExcludedRequirements = (values: string[]) => {
    const excludedRequirements = handleExcludedRequirements(values);
    setFormValues((pre) => {
      return {
        ...pre,
        excludedRequirements: excludedRequirements
      };
    });
  };

  const setSelectionInput: <V extends string>(id: string) => (value: V) => void = (id) => (value) => {
    setFormValues((pre) => {
      return {
        ...pre,
        userQuery: {
          ...pre.userQuery,
          [id]: value
        }
      };
    });
  };

  const handleUserFormSubmit = onSubmit(async (values) => {
    const data = await fetch(`http://localhost:3000/api/user/${user?.userID}`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-type': 'application/json'
      }
    });
    return await data.json();
  });

  const setOverallExperience = onChange;
  return {
    formValues,
    setOverallExperience,
    handleUserFormSubmit,
    setRequirements,
    setExcludedRequirements,
    setSelectionInput,
    formState
  };
}

export default useUserForm;

export type FormComponents<T> = T & ReturnType<typeof useUserForm>;
