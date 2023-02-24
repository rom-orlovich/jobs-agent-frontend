import useForm from '@/hooks/useForm/useForm';

import { API_ENDPOINTS } from '@/lib/endpoints';
import { UserProfileWithOneUserQuery } from '@/lib/types/api.types';
import { toast } from 'react-toastify';
import { MinMaxInputsOption } from '../../components/UserProfileForm/Requirements/MinMaxInputs';
import {
  transformDefaultFormValues,
  transformExcludedRequirements,
  transformRequirements
} from './utils';

/**
 * Manage the user details form state.
 * @param {UserProfile} user The current login user.
 */
function useUserProfileForm(user: UserProfileWithOneUserQuery) {
  const formInitialValue: UserProfileWithOneUserQuery = user;
  // Initializes the form state and get the utils functions from useForm hook.
  const { formValues, onChange, onSubmit, setFormValues, formState } = useForm<
    UserProfileWithOneUserQuery,
    { message: string }
  >(formInitialValue);

  // Handles the overallExperience on change event.
  const handleOverallExperience = onChange;

  // Handles the transform of requirements values to be valid before form's submitting.
  const handleRequirements = (minMaxValues: MinMaxInputsOption[]) => {
    const requirements = transformRequirements(minMaxValues);
    setFormValues((pre) => {
      return {
        ...pre,
        requirements: requirements
      };
    });
  };

  // Handles the transform of excludedRequirements values to be valid before form's submitting.
  const handleExcludedRequirements = (values: string[]) => {
    const excludedRequirements = transformExcludedRequirements(values);
    setFormValues((pre) => {
      return {
        ...pre,
        excludedRequirements: excludedRequirements
      };
    });
  };
  // Handles the transform of userQuery values to be valid before form's submitting.
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

  // Pass the callback that execute during the submit event and execute the submit event.
  const handleUserProfileFormSubmit = onSubmit(async (values) => {
    const result = await fetch(`/${API_ENDPOINTS.USERS}/${user?.userID}`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-type': 'application/json'
      }
    });

    const data = await result.json();
    toast(data.message);
    return data;
  });

  return {
    formValues: transformDefaultFormValues(formValues),
    handleOverallExperience,
    handleUserProfileFormSubmit,
    handleRequirements,
    handleExcludedRequirements,
    handleSelectionInput,
    formState
  };
}

export default useUserProfileForm;

export type FormComponents<T> = T & ReturnType<typeof useUserProfileForm>;
