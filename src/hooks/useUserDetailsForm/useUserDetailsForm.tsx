import useForm from '@/hooks/useForm/useForm';

import { API_ENDPOINTS } from '@/lib/endpoints';
import { UserOptions } from '@/lib/types/api.types';

import { MinMaxInputsOption } from '../../components/UserDetailsForm/Profile/MinMaxSelect';
import {
  transformDefaultFormValues,
  transformExcludedRequirements,
  transformRequirements
} from './utils';

/**
 * Manage the user details form state.
 * @param {UserOptions} user The current login user.
 */
function useUserDetailsForm(user: UserOptions) {
  const formInitialValue: UserOptions = user;

  // Initialize form state and get the utils function from userForm hook.
  const { formValues, onChange, onSubmit, setFormValues, formState } = useForm<
    UserOptions,
    { message: string }
  >(formInitialValue);
  const handleRequirements = (minMaxValues: MinMaxInputsOption[]) => {
    const requirements = transformRequirements(minMaxValues);
    setFormValues((pre) => {
      return {
        ...pre,
        requirements: requirements
      };
    });
  };

  const handleExcludedRequirements = (values: string[]) => {
    const excludedRequirements = transformExcludedRequirements(values);
    setFormValues((pre) => {
      return {
        ...pre,
        excludedRequirements: excludedRequirements
      };
    });
  };

  const handleSelectionInput: <V extends string>(id: string) => (value: V | V[]) => void =
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

  const handleUserDetailsFormSubmit = onSubmit(async (values) => {
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
    handleUserDetailsFormSubmit,
    handleRequirements,
    handleExcludedRequirements,
    handleSelectionInput,
    formState
  };
}

export default useUserDetailsForm;

export type FormComponents<T> = T & ReturnType<typeof useUserDetailsForm>;
