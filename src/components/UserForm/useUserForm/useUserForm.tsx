import useForm from '@/hooks/useForm/useForm';

import { API_ENDPOINTS } from '@/lib/endpoints';
import { UserOptions } from '@/lib/user.types';
import { MinMaxInputsOption } from '../Profile/MinMaxSelect';
import { handleExcludedRequirements, handleRequirements, transformDefaultFormValues } from './handlers';

function useUserForm(user: UserOptions) {
  const formInitialValue: UserOptions = user;

  const { formValues, onChange, onSubmit, setFormValues, formState } = useForm<
    UserOptions,
    { message: string }
  >(formInitialValue);
  const setRequirements = (minMaxValues: MinMaxInputsOption[]) => {
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

  const setSelectionInput: <V extends string>(id: string) => (value: V | V[]) => void =
    (id) => (value) => {
      const extractValue = Array.isArray(value) ? value.join(',') : value;

      setFormValues((pre) => {
        return {
          ...pre,
          userQuery: {
            ...pre.userQuery,
            [id]: extractValue
          }
        };
      });
    };

  const handleUserFormSubmit = onSubmit(async (values) => {
    const data = await fetch(`/${API_ENDPOINTS.USERS}/${user?.userID}`, {
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
    formValues: transformDefaultFormValues(formValues),
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
